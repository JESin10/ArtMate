<!-- # artmate

<img width="100%" alt="Top-Bar" src="https://github.com/JESin10/PortFolio/assets/119720123/9f1f77e6-0428-4294-b67b-f6140b70b917">

23.10.18 - 24.01.

artmate URL : [artmate](https://jin-portfolio-drab.vercel.app/)

📎 회고 URL
[Velog 회고](https://velog.io/@jin_s/WIL-23.07.16)

Notion URL
[artmate-Notion](https://jin29.notion.site/ArtMate-7a7b69e3c1da4f4bbf64cda1999a9ab0?pvs=4)

## 📌 서비스 소개


현재 진행중인 전시에 대한 정보를 확인하고, 관련 미술관 및 박물관에 대한 정보를 확인할 수 있는 정보제공 사이트

개인 포트폴리오 용도로 제작된 사이트입니다.

스크롤 다운 형태로 진행하였으며, TypeScript를 기반으로 하였으며, Tailwind CSS framework를 사용하였습니다.

## 📌 기술 스택

FrontEnd: React, Typescript, TailwindCss

Deployment : Vercel

## 📌 서비스 예시

<details><summary> in Mobile </summary>

<img width="25%" alt="Portfolio_mobile_about" src="https://github.com/JESin10/PortFolio/assets/119720123/f2a47790-6615-4e25-92d8-adc4ad248f3b">
<img width="25%" alt="Portfolio_mobile_project" src="https://github.com/JESin10/PortFolio/assets/119720123/5721ad5f-3c08-4995-a2cb-d729e57375b5">
<img width="25%" alt="Portfolio_mobile_project_2" src="https://github.com/JESin10/PortFolio/assets/119720123/08ace3e3-035a-4c9c-a8c6-f63b361edbac">
<img width="25%" alt="Portfolio_mobile_skill" src="https://github.com/JESin10/PortFolio/assets/119720123/04a06934-2232-4ef5-9f93-7feaf9dddd57">
<img width="25%" alt="Portfolio_mobile_skill2" src="https://github.com/JESin10/PortFolio/assets/119720123/f1775704-d13e-4b71-ba70-095a9765b190">

</details>

<details><summary> in Desktop </summary>

<img width="40%" alt="Portfolio_about" src="https://github.com/JESin10/PortFolio/assets/119720123/ad3197d3-2a24-4a3f-a4b5-3b891645f8eb">
<img width="40%" alt="Portfolio_project" src="https://github.com/JESin10/PortFolio/assets/119720123/cb1c9c4a-4ac1-46b9-a0d6-a4f469e6c418">
<img width="40%" alt="Portfolio_skill" src="https://github.com/JESin10/PortFolio/assets/119720123/20387672-80a6-4b33-9ea6-24914d738992">

</details>


## 📌 서비스 구현 상세

<details><summary> 🎨 WireFrame </summary>


<img width="52%" alt="Initial_wireframe" src="https://github.com/JESin10/ArtMate/assets/119720123/6f67df11-49af-4c22-9a77-927e045ea0a3">


<img height="300" alt="Initial_wireframe" src="https://github.com/JESin10/ArtMate/assets/119720123/9ebde079-09e1-4144-b59c-a5f92857ffb7"> <img height="300" alt="Initial_style-guide" src="https://github.com/JESin10/ArtMate/assets/119720123/9050541f-eb71-462f-ba36-8ae3ca774f1e">


[Link to Figma](https://www.figma.com/file/0iw4lYmsIkfaZHq0X9uad2/artmate?type=design&node-id=0%3A1&mode=design&t=7EePHmLY6g6WgoiF-1)

</details>



✅ Firebase

사용자 인증이나 Database 사용에 있어 구글의 Firebase 플랫폼을 사용해 FrontEnd와 BackEnd를 모두 적용하였습니다.

기존 프로젝트에서 Auth와 Database의 기본적인 부분만 사용하였지만 Storage를 사용해 이미지를 별도 저장하며 BackEnd 영역까지 관리할 수 있도록 구성하였습니다.

Firebase Database에서는 사용자의 정보, 리뷰와 같이 수정가능한 정보들을 저장하였고 Storage에서는 리뷰 혹은 프로필에 사용될 이미지들을 따로 저장하였습니다.

✅ Tailwind + Styled-component

스타일의 확장성 및 커스터마이징을 위해 기본적으로는 Tailwind를 사용하였습니다.

다만, 가독성과 컴포넌트 단위의 장점을 살리기위하여 styled-component를 함께 결합한 tailwind-styled-component를 사용했습니다.

✅ 모바일 웹

초기 디자인이 모바일에 맞춰진만큼 모바일 웹으로 구현하였습니다.

모바일에서 사용이 편한 UX를 고려해 디자인 및 기능을 수정, 적용하였습니다.


✅ Custom Hook

개인프로젝트인 만큼 러프한 초기 구성에서 자주 사용되는 function을 파악하고,

custom hook으로 만들어 public하게 접근 및 사용이 용이 하도록 하였습니다.


✅ 공공 API 활용

프로젝트에 필요한 정보를 서울시 공공 API를 사용하였습니다.
 -->
