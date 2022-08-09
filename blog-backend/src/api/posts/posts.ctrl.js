import Post from '../../models/post';
import mongoose from 'mongoose';
/*
### ObjectId 검증

- 앞서 read API를 실행할 때, id가 올바른 ObjectId 형식이 아니면 500 오류가 발생했었음
    - 500 오류 : 보통 서버에서 처리하지 않아 내부적으로 문제가 생겼을 때 발생
- 잘못된 id 전달 → 400 Bad Request 오류(클라이언트가 요청을 잘못 보낸 것)
⇒  id 값이 올바른 ObjectId 인지 확인해야 함
- 이 프로젝트에서 현재 ObjectId를 검증해야 하는 API 세 가지
    - read
    - remove
    - update    
    → 모든 함수에서 이를 검증하기 위해 검증 코드를 각 함수 내부에 일일이 삽입한다면 똑같은 코드가 중복됨
- 코드를 중복해 넣지 않고, 한 번만 구현한 다음 여러 라우트에 쉽게 적용하는 방법 사용 → 미들웨어 사용
- posts.ctrl.js 의 코드 상단에 미들웨어 작성하기
- 그리고 src/api/posts/index.js 에서 ObjectId 검증이 필요한 부분에 방금 만든 미들웨어 추가하기
*/
const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Reauest
    return;
  }
  return next();
};

/*
- 포스트의 인스턴트를 만들 때는 new 키워드를 사용
- 그리고 생성자 함수의 파라미터에 정보를 지닌 객체를 넣음
- 인스턴스를 만들면 바로 데이터베이스에 저장되는 것은 아님
- save() 함수를 실행시켜야 비로소 데이터베이트에 저장됨
    - 이 함수의 반환 값은 Promise 이므로 async/await 문법으로 데이터베이스 저장 요청을 완료할 때까지 await를 사용하여 대기할 수 있음
    - await를 사용하려면 함수를 선언하는 부분 앞에 async 키워드를 넣어야 함
    - 또한, await를 사용할 때는 try/catch 문으로 오류를 처리해야 함
*/
/* 
POST /api/posts
{ 
  title: '제목',
  body: '내용',
  tags: ['태그1', '태그2']
}
*/
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

//- 데이터를 조회할 때는 인스턴스의 find() 함수 사용
// - find() 함수를 호출한 후에는 exec()를 붙여 주어야 서버에 쿼리를 요청함
// - 데이터를 조회할 때 특정 조건을 설정하고, 불러오는 제한도 설정 가능(추후 작성)
/*
  GET /api/posts
*/
export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// - read 함수를 통해 특정 포스트를 id로 찾아서 조회하는 기능 구현
// - id를 가진 데이터를 조회할 때는 findById() 함수 사용
// → id의 마지막 문자를 바꾸면 Status 부분에 404 오류가 발생함
// → 문자열을 몇 개 제거하고 요청하면 500 오류가 발생함
// : 이는 전달받는 id가 ObjectId 형태가 아니어서 발생하는 서버 오류
/*
  GET /api/posts/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// - 데이터를 삭제할 때는 여러 종류의 함수를 사용할 수 있음
//     - remove() : 특정 조건을 만족하는 데이터를 모두 지웁니다.
//     - findByIdAndRemove() : id를 찾아서 지웁니다.
//         - 우리는 이것을 사용
//     - findOneAndRemove() : 특정 조건을 만족하는 데이터 하나를 찾아서 제거합니다.
// → 코드 저장후 Postman으로 조금전 GET 요청했던 그 주소에 DELETE 요청 후 다시 GET 요쳥하면 404오류 뜨면서 ‘Not Found’ 문구 뜰 것
/*
  DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Context(성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

// - 데이터 업데이트할 때는 findByIdAndUpdate() 함수 사용(세 개의 파라미터)
// - findByIdAndUpdate( id, 업데이트 내용, 업데이트의 옵션)
// → 다시 GET /api/posts 요청을 해서 유효한 id 값 복사한 후 해당 id를 가진 포스트를 업데이트 해보기
// → PATCH 메서드는 데이터의 일부만 업데이트해도 되므로, body에 title만 넣어서 실행해보기
/*
  PATCH /api/posts/:id
  {
    title: '수정',
    body: '수정 내용',
    tags: ['수정', '태그']
  }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트 된 데이터를 반환합니다.
      // false일 때는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
