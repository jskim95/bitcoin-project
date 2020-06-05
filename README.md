# Vue-project

## 목차
- 프로젝트 개요
- 프로젝트 계획
- 설명

## 프로젝트 개요
**진행 기간** : 2020.06.01 ~ 2020.06.05(5일)  
**만든 이유** : [이전 프로젝트](https://github.com/jskim95/Vue-project)에서 비트코인 관련 내용을 제작하다가
관심이 생겨서 디테일하게 만들어보고 싶어서  
**설명** : Vue프레임워크와 upbit Open API를 활용하여 코인별 차트와 시간별 시세변동을 볼수 있는 홈페이지 
**역할** : 모두 혼자 함  

## 개발환경
- HTML, CSS, JavaScript
- Vue
  - vuex
  - vue-router
  - axios
  
- chart
  - vue-apexcharts

- tool
  - Atom
  
## 프로젝트 계획
- router를 이용하여 페이지 이동할 때 main부분만 변경되도록 레이아웃 설계
- vuex를 이용하여 페이지 마다 공통으로 사용되는 데이터 store에 모듈화하여 등록
- upbit API 활용하여 가공한 데이터 (거래소 페이지)에서 vue-apexcharts 이용하여 candle차트 만들기
- upbit API 활용하여 가공한 데이터 (코인 동향 페이지)에서 일간, 주간, 월간 시세 변동 화면에 출력

## 설명



