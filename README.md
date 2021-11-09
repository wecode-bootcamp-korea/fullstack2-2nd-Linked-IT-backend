# LinkedIT Back-end 소개

- 비즈니스 전문 소셜 미디어 '[링크드인(LinkedIn)](https://www.linkedin.com/)'을 클론 코딩한 프로젝트입니다.
- 아래 이미지를 클릭하면, 본 프로젝트의 Demo 영상을 시청할 수 있습니다.
  [![[LinkedIT] Demo 영상](./public/images/readme_thumbnail.png)](https://vimeo.com/634975398)

### 🗓 기간

---

2021.10.25 ~ 2021.11.05 (12일)

### 🛠 기술

---

- `Back-end`: Node.js, Express, MySQL, Prisma, Bcrypt, JWT, Jest

### 👨‍👩‍👧‍👦 Team Front-end

---

- [김시원](https://github.com/k-cool) : MyProfile(이력서) 페이지 및 User Card 컴포넌트 구현
- [김재원](https://github.com/jambottle) : Home/SignUp/SignIn 페이지 및 Global Footer & Linear Footer 컴포넌트 구현
- [이성재](https://github.com/hanslee1) : TopNav(+검색창) & Button 컴포넌트 구현
- [한승완](https://github.com/han0gu) : MyNetwork(인맥) & Jobs(채용공고) 페이지 및 Job Posting Card & Company Profile Card 컴포넌트 구현
- [한지훈](https://github.com/JivenHan) : Feed(타임라인) 페이지 및 Floating Footer 컴포넌트 구현

### 👨‍👩‍👧‍👦 Team Back-end

---

- [김민재](https://github.com/minjamie) : 초기 세팅 및 Database Modeling 및 Feed API, Jobs API & Search API 구현
- [김재원](https://github.com/jambottle) : SignUp/SignIn API 및 소셜 로그인 기능 구현
- [김진성](https://github.com/jsung1103) : Prisma Schema 작성 및 MyProfile API 구현
- [한승완](https://github.com/han0gu) : User 간의 친구 관계를 관리하는 CRUD API 구현

### 🤝 Back-end Repository

---

https://github.com/wecode-bootcamp-korea/fullstack2-2nd-Linked-IT-backend

<br/>

## 📑 구현 기능 상세

### 1. 공통 구현 사항

- Header
  - 로그인/회원가입 페이지로 이동하는 링크 구현
  - 상품 검색창 및 장바구니 아이콘 기능 구현
- NavBar
  - '전체 카테고리' 부분을 hover하면, 카테고리 네비게이션이 Dropdown되는 효과 구현
  - 카테고리 항목별로 click하면, 해당 카테고리의 상품 리스트 페이지로 이동하는 라우팅 기능 구현
- Footer
  - 정해진 시간에만 '채팅상담' 버튼 활성화 기능 구현 (그외 시간에 click하면, 경고창 Popup으로 대체)

### 2. Home/SignUp/SignIn 페이지

- 정규표현식을 활용하여 입력한 이메일/닉네임/비밀번호의 타당성 검사 기능 구현
- 회원가입 페이지에서 회원가입 성공 시, 로그인 페이지로 이동하는 기능 구현
- 로그인 페이지에서 로그인 성공 시, 메인 페이지로 이동하는 기능 구현
- 로그인 페이지에서 로그인 성공 시, Header의 '로그인/회원가입' 링크가 '로그아웃'으로 변경되는 기능 구현
- 로그인 페이지에서 로그인 실패 시, 경고창 Popup으로 로그인 실패 사실에 대한 알림 기능 구현

### 3. Feed(타임라인) 페이지

- 화면 왼쪽에 로그인한 유저의 간단한 프로필 정보를 모달 창으로 표시 (클릭 시 프로필 페이지로 이동)
- 최신 작성한 글이 가장 상단에 노출, 페이지 내 모든 모달 창은 외부 클릭 시 닫히도록 구현
- 포스트(Feed)의 길이가 3줄이 넘어갈 경우, '더 보기' 버튼 활성
- 포스트 쓰기, 자신이 쓴 글에 대한 '편집' 버튼 활성, 포스트 수정 및 삭제 기능 구현
- 6가지 좋아요 기능(Like, Celebrate, Support, Love, Insightful, Curious) 구현
- 댓글 쓰기, 추천, 수정 및 삭제 기능 구현
- 화면 최하단에 도달하면, 포스트 데이터를 4개씩 추가로 불러오도록 구현

### 4. MyNetwork(인맥) 페이지

- 회사, 학교, 산업군 등 사용자 정보를 기준으로 알 수도 있는 사람을 추천 (레이아웃 구현 완료, 기능 구현 중)
- 각 섹션의 '모두 보기' 버튼을 클릭하여 더 많은 유저 정보를 조회
- 받은 1촌 신청, 보낸 1촌 신청, 친구 목록 조회 및 각 요청에 대한 수락/거절/삭제 가능 (→ Connections)

### 5. Jobs(채용공고) 페이지

- 채용공고 리스트 조회
- 각 채용공고 카드를 클릭하여 채용공고의 상세내용 조회

### 6. MyProfile(이력서) 페이지

- 정규표현식을 활용하여 입력한 이메일/닉네임/비밀번호의 타당성 검사 기능 구현
- 회원가입 페이지에서 회원가입 성공 시, 로그인 페이지로 이동하는 기능 구현
- 로그인 페이지에서 로그인 성공 시, 메인 페이지로 이동하는 기능 구현
- 로그인 페이지에서 로그인 성공 시, Header의 '로그인/회원가입' 링크가 '로그아웃'으로 변경되는 기능 구현
- 로그인 페이지에서 로그인 실패 시, 경고창 Popup으로 로그인 실패 사실에 대한 알림 기능 구현

<br/>

### ※ References

---

- 본 프로젝트는 팀원들의 학습을 목적으로 [링크드인(LinkedIn)](https://www.linkedin.com/)을 참고하여 만들었습니다. 이 코드를 활용하여 상업적인 이득을 취하거나 무단으로 배포할 경우에는 법적으로 문제될 수 있습니다.
- 본 프로젝트에서 사용하고 있는 각종 이미지들은 [Unsplash](https://unsplash.com/) 등에서 무료로 배포 중인 이미지들로 대체하였습니다.
