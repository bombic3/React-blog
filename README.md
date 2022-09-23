# React-Blog
React와 Node.js를 활용한 블로그 웹 사이트 애플리케이션

# ✨실행영상
<a href="https://youtu.be/soZUhsGuUjg">
<img width="1440" alt="스크린샷 2022-09-14 오후 5 06 31" src="https://user-images.githubusercontent.com/87863264/190311598-dfc51422-5bdf-45eb-a018-33356c86485b.png">
</a>

## 🖥️ 프로젝트 소개
리액트를 이용한 개인 블로그 서비스 개발
회원가입/로그인 기능과 글쓰기/태그 기능이 있는 블로그 사이트 입니다. 

## 🕰️ 개발 기간
* 22.08.05일 - 22.08.31일 (3주)

## ⚙️ 개발 환경
- Front-end
  - React
  - Webpack
  - Yarn
  - axios
  - Babel
  - Quill
- Back-end
  - Node.js
  - Mongo DB(mongoose)
  - Koa
  - BCrypt HASH
- 상태관리
  - Redux
- OS/Test Browser
  - Chrome

=> 다양한 라이브러리, 프레임워크, 툴 사용<br>
=> 단일 언어로 풀스택이 가능한 **Java Script** 생태계로 개발

## 💡 프로젝트 구조
![프로젝트 구조](https://user-images.githubusercontent.com/87863264/190332460-b24470da-3005-4719-9110-867e374c4aff.png)

## ⭐️ 특징
- 초기렌더링, 리렌더링, Virtual DOM
  - 데이터가 변할때마다 변화를 주는 것이 아닌, 기존 뷰를 삭제하고 처음부터 다시 렌더링 하는 개념으로 접근했다.
  - 최대한 성능을 아끼며 편안한 사용자 경험을 제공하도록 한다.
- 불변성 유지
  - 상태관리를 위해 리덕스 라이브러리를 사용함으로서 좋은 성능을 위해 불변성을 유지하며 개발하였다.
  - 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality)검사를 하기 때문에 객체의 변화를 감지할 때 좋은 성능을 유지할 수 있다.
- 비동기 요청
  - 리턴에 상관없이 스레스가 계속 실행되는 비동기 호출 방식을 사용하여 어떤 작업이 대기 중일 때 다른 작업을 수행할 수 있도록 효율성을 높였다.

## ↔️UseCase
![usecase](https://user-images.githubusercontent.com/87863264/191881772-461b125f-f315-47ec-a10f-a72ccec45ade.png)

## 📌 주요 기능
#### 회원가입
- ID 중복 체크
- 비밀번호 일치
#### 로그인
- JWT 토큰 기반 회원 로그인 시스템 구현
- 로그인 시 쿠키(Cookie) 및 세션(Session) 생성
- DB값 검증
- 로그인 시 글쓰기 버튼 
#### 글쓰기
- 로그인 상태일 때만 글쓰기 가능하도록 구현
#### 수정/삭제
- 해당 글을 작성한 사용자만 수정/삭제 가능하도록 구현
#### 해시태그
- 특정 태그 클릭 시 관련 태그 작성된 게시글 모아볼 수 있도록 구현
#### 작성자별 게시물 출력
- 작성자 아이디를 클릭하면 해당 작성자가 작성만 게시글만 모아서 출력하도록 구현

## 🪧 요구사항명세서
| **번호** | **요구사항 명세서** |                                                              **상세 내용**                                                              |
|:--------:|:-------------------:|:---------------------------------------------------------------------------------------------------------------------------------------:|
|     1    |  포스트 목록 페이지 | 포스트 페이지를 메인 페이지로 설정하여 게시글을 바로 확인할 수 있도록 구성. 누구나 게시글 조회 가능하도록 모든 목록 출력                |
|     2    |       회원가입      | 아이디 중복 체크 기능. 비밀번호 일치/불일치 체크 기능. 새로운 사용자 데이터 MongoDB에 저장되도록 구현.                                  |
|     3    |        로그인       | JWT 토큰 기반 로그인 시스템 구현. 회원가입하여 DB에 저장되어 있는 사용자만 로그인할 수 있도록 구현.                                     |
|     4    |        헤더바       | 메인화면으로 가는 로고와 로그인 상태를 볼 수 있도록 화면 구성. 상단에 고정하여 항상 보이도록 구현.                                      |
|     5    |       글 작성       | 로그인하면 글 작성 버튼이 나타나도록 구현. 우측 상단에 버튼 고정하여 스크롤 이동 없이 바로 글 작성할 수 있도록 구성.                    |
|     6    |       해시태그      | 생성된 해시태그 중 특정 태그 클릭 시 해당 해시태그가 설정돼 있는 포스트만 모아 출력 가능하도록 구성.                                    |
|     7    |      수정/삭제      | 해당 글을 작성한 사용자만 수정/삭제 버튼이 보이도록 구현. 삭제 클릭시 모달창 출력하여 삭제 여부를 재확인할 수 있도록 구현.              |
|     8    |      이전/다음      | 현재 포스트의 개수가 10개 초과 시 다음 페이지로 이동할 수 있도록 설정. 첫 페이지와 마지막 페이지에서 넘어가는 버튼 비활성화되도록 구현. |
