# K-의원 (k-uiwon-web)

국회의원 의정활동을 시각화하여 시민들이 쉽게 확인할 수 있는 웹 서비스입니다.

## 주요 기능 (예정)

- 의원별 법안 발의/통과 현황 대시보드
- 출석률, 당론 충성도 등 활동 지표 시각화
- 지역구별 의원 활동 지도
- 의원 간 비교 분석
- 키워드 기반 관심 분야 분석

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 19, Vite 6 |
| 스타일 | CSS (추후 Tailwind 도입 예정) |
| 배포 | 미정 (Vercel / Netlify 검토 중) |

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/k-uiwon/k-uiwon-web.git
cd k-uiwon-web

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드

```bash
npm run build
npm run preview  # 빌드 결과 미리보기
```

## 프로젝트 구조

```
k-uiwon-web/
├── docs/                  # 기획 문서 및 프로토타입
├── public/                # 정적 파일
├── src/
│   ├── components/        # React 컴포넌트
│   │   └── KuiwonDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## 로드맵

- [x] 프로토타입 대시보드 제작
- [ ] [화면 설계 (와이어프레임)](https://github.com/k-uiwon/k-uiwon-web/issues/1)
- [ ] [MVP 범위 확정](https://github.com/k-uiwon/k-uiwon-web/issues/2)
- [ ] [프로젝트 구조 잡기](https://github.com/k-uiwon/k-uiwon-web/issues/3)
- [ ] [핵심 기능 구현](https://github.com/k-uiwon/k-uiwon-web/issues/4)
- [ ] [배포 및 피드백](https://github.com/k-uiwon/k-uiwon-web/issues/5)

## 기여 방법

1. 이슈를 확인하고 작업할 항목을 선택합니다.
2. 브랜치를 생성합니다: `git checkout -b feature/기능명`
3. 변경사항을 커밋합니다.
4. Pull Request를 생성합니다.

## 라이선스

MIT License
