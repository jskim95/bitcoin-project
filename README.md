# bitcoin-project

## 목차
- 프로젝트 개요
- 프로젝트 계획
- 설명

## 프로젝트 개요
**진행 기간** : 2020.06.01 ~ 2020.06.05(5일)  
**만든 이유** : [이전 프로젝트](https://github.com/jskim95/Vue-project)에서 비트코인 관련 내용을 제작하다가 관심이 생겨서 디테일하게 만들어보고 싶어서  
**설명** : Vue프레임워크와 upbit Open API를 활용하여 실시간으로 가장 최신의 정보를 가진 모든 코인의 차트와 시세변동을 볼수 있는 홈페이지  
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

## 1.로딩 페이지
![image](https://user-images.githubusercontent.com/52224543/83846870-3f505500-a746-11ea-8c9d-c6aedde233af.png)
- upbit open API에 axios.get요청을 통해 거래소 페이지에서 사용할 데이터를 받게되면 로딩 화면페이지 메인화면으로 이동

## 2.메인 페이지
![image](https://user-images.githubusercontent.com/52224543/83848497-ed5cfe80-a748-11ea-9aff-c1dc103cbc26.png)
- 홈페이지의 첫 페이지로서 간단한 소개와 상단의 메뉴를 볼수 있는 화면
- 크롤링을 통하여 코스피, 나스닥의 현재가격, 전일대비 증감 데이터를 전달받아 하단 부분에 표시

## 3.거래소 페이지
1. **실시간으로 데이터를 수집하여 가장 최신 정보를 vue-apexcharts를 사용하여 candle 차트로 제작**
2. **모든 암호화폐는 이름을 클릭하면 해당 암호화폐의 현재부터 70일 이전의 가격을 차트로 확인 가능**

### 거래소 페이지 기본 화면
![image](https://user-images.githubusercontent.com/52224543/83849464-6dd02f00-a74a-11ea-8c19-9b3a3394fd36.png)

- Upbit API를 통해 제공해주는 암호화폐 시세 정보를 보여주고 상승률을 표시한 화면
- 시세가 상승한 정보는 빨간색 시세가 하락한 정보는 파란색으로 표시
- 왼쪽 차트부분은 해당 암호화폐를 클릭시 해당 암호화폐의 데이터를 바인딩하여 candle차트를 제작 

### 다른 암호화폐를 클릭했을 때 변경되는 화면
![image](https://user-images.githubusercontent.com/52224543/83850963-9eb16380-a74c-11ea-95be-f9d25bbdfa3f.png)

- 이중 스크롤을 통해서 코인을 찾기위해 스크롤을 내리거나 올리더라도 차트는 움직이지 않게 구현
- 다른 암호화폐를 클릭 하게 되면 차트와 왼쪽 상단에 데이터 정보가 업데이트됌

### 사용권한이 없는 버튼 클릭시 보여지는 화면
![image](https://user-images.githubusercontent.com/52224543/83851505-6eb69000-a74d-11ea-8742-881f96912cce.png)

## 4.입출금, 투자내역 페이지
![image](https://user-images.githubusercontent.com/52224543/83853084-b807df00-a74f-11ea-998c-c5fc43533ca8.png)

## 5. 코인 동향 페이지
1. **일간 상승률** - (현재 시간 - (오늘) 오전9시) - 상승률
2. **주간 상승률** - (현재 시간 - (오늘 기준 7일전) 오전9시) - 상승률
3. **월간 상승률** - (현재 시간 - (오늘 기준 30일전) 오전9시) - 상승률

### 일간, 주간 암호화폐 상승률 확인 화면
![image](https://user-images.githubusercontent.com/52224543/83853343-1f259380-a750-11ea-997f-2de1fbed55ed.png)

### 월간 암호화폐 불러오는 화면
![image](https://user-images.githubusercontent.com/52224543/83853943-fc47af00-a750-11ea-8ab9-13116ccedf38.png)

### 월간 암호화폐 불러온 후 화면
![image](https://user-images.githubusercontent.com/52224543/83854008-0c5f8e80-a751-11ea-9407-617c55a7cc48.png)



## vuex
### - 파일 구조
![image](https://user-images.githubusercontent.com/52224543/83857343-ceb13480-a755-11ea-8928-49027cc309fe.png)

### - 모듈(bitcoinData.js)
![image](https://user-images.githubusercontent.com/52224543/83856514-a37a1580-a754-11ea-8f76-a0e4a7bbe2c4.png)

### - 저장소(index.js)
![image](https://user-images.githubusercontent.com/52224543/83856585-c0164d80-a754-11ea-9235-5b1188238a02.png)

### - 컴포넌트(bitcoinMain.vue)
![image](https://user-images.githubusercontent.com/52224543/83856694-eb00a180-a754-11ea-9ee4-40d35cd0fd3f.png)


