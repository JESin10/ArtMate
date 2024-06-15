# ArtMate

<img width="100%" alt="Top-Bar" src="https://github.com/JESin10/ArtMate/assets/119720123/cbeac7bc-7d28-4814-a172-a0091b069357">

23.10 - 24.12 / 24.03 - 24.06

artmate URL : [artmate](https://artmate-ver100.web.app/)

📎 회고 URL
[Velog 회고](https://velog.io/@jin_s/WIL-24.06.15)

Notion URL
[artmate-Notion](https://jin29.notion.site/ArtMate-7a7b69e3c1da4f4bbf64cda1999a9ab0?pvs=4)

## 📌 서비스 소개

현재 서울시립 미술관에서 진행중인 전시에 대한 정보를 확인하고, 관련 미술관 및 박물관에 대한 정보를 확인할 수 있는 정보제공 사이트이며, 개인 학습 용도로 제작된 사이트입니다.

스크롤 다운 형태로 진행하였으며, TypeScript를 기반으로 Tailwind CSS framework를 사용하였습니다.

## 📌 기술 스택

FrontEnd: React, Typescript, TailwindCss

Deployment : FireBase

## 📌 서비스 예시

<details><summary> 🎨 WireFrame </summary>

<img width="52%" alt="Initial_wireframe" src="https://github.com/JESin10/ArtMate/assets/119720123/284f422f-a318-425d-98dc-845c05f60ccc">

[Link to Figma](https://www.figma.com/design/0iw4lYmsIkfaZHq0X9uad2/artmate?node-id=610-3192&t=hLvZTYrFwyppFcAY-1)

</details>

<details><summary> Mobile </summary>

<img width="25%" alt="Page_ex1" src="https://github.com/JESin10/ArtMate/assets/119720123/e7216398-04af-4401-a5fb-9c970dcf2cd8">
<img width="25%" alt="Page_ex2" src="https://github.com/JESin10/ArtMate/assets/119720123/0526dba7-1bbc-4790-a574-c0cdc050d5d1">
<img width="25%" alt="Page_ex3" src="https://github.com/JESin10/ArtMate/assets/119720123/d79c4f86-e389-47c3-abd1-b15922300a19">

</details>


## 📌 서비스 구현 상세


✅ Firebase

사용자 인증이나 Database 사용에 있어 구글의 Firebase 플랫폼을 사용해 FrontEnd와 BackEnd를 모두 적용하였습니다.

기존 프로젝트에서 Auth와 Database의 기본적인 부분만 사용하였지만 Storage를 사용해 이미지를 별도 저장하며 BackEnd 영역까지 관리할 수 있도록 구성하였습니다.

Firebase Database에서는 사용자의 정보, 리뷰와 같이 수정가능한 정보들을 저장하였고 Storage에서는 리뷰 혹은 프로필에 사용될 이미지들을 따로 저장하였습니다.

✅ Tailwind + Styled-component

스타일의 확장성 및 커스터마이징을 위해 기본적으로는 Tailwind를 사용하였습니다.

다만, 가독성과 컴포넌트 단위의 장점을 살리기위하여 styled-component를 함께 결합한 tailwind-styled-component를 사용했습니다.

정교한 CSS가 필요한 상황의 경우 tailwindCss나 styled-component로 복잡도를 키우기보단, 기본적인 CSS를 활용하였습니다.

svg아이콘을 component화 하여 사용하는 경우에는 styled-component를 활용하였습니다.

✅ 모바일 웹

초기 디자인이 모바일에 맞춰진만큼 모바일 웹으로 구현하였습니다.

모바일에서 사용이 편한 UX를 고려해 디자인 및 기능을 수정, 적용하였습니다.

✅ Custom Hook

개인프로젝트인 만큼 러프한 초기 구성에서 자주 사용되는 function을 파악하고,

custom hook으로 만들어 public하게 접근 및 사용이 용이 하도록 하였습니다.

✅ 공공 API 활용

개발 밑 테스트 단계에서는 프로젝트에 필요한 정보를 서울시 공공 API를 사용하였으나, 공공 API가 http로 배포가 되어있는 관계로

배포단계에서는 OPEN API를 대신하여 JSON파일을 받아 firebase의 RealTimeDataBase에 저장 및 불러오는 방식으로 변경하였습니다.

해당 JSON파일은 한달에 한번 업데이트 예정에 있습니다.
