import context from '../../../node_modules/koa/lib/context';
import Post from '../../models/post';
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
export const read = (ctx) => {};
export const remove = (ctx) => {};
export const update = (ctx) => {};
