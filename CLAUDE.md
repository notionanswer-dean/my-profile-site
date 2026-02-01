# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

개인 포트폴리오 웹사이트 - 바닐라 HTML/CSS/JavaScript로 구현된 정적 사이트.

## Tech Stack

- **HTML5** - 시맨틱 마크업
- **Tailwind CSS** - CDN 방식 (빌드 불필요)
- **Vanilla JavaScript** - ES6+
- **GSAP** - 애니메이션 라이브러리 (ScrollTrigger 포함)
- **Pretendard** - 한글 웹폰트

## Development

빌드 도구 없음. 로컬 서버로 바로 실행:

```bash
# Python 사용
python -m http.server 8000

# Node.js 사용
npx serve .

# 또는 브라우저에서 index.html 직접 열기
```

## Architecture

### 파일 구조
- `index.html` - 전체 페이지 마크업 (단일 페이지)
- `styles.css` - 커스텀 스타일 (Tailwind 보완)
- `script.js` - 인터랙션 및 애니메이션 로직

### 스타일링 구조
1. Tailwind CSS (CDN) - 유틸리티 클래스
2. `styles.css` - Glassmorphism 컴포넌트, 커스텀 컬러, 애니메이션 초기 상태

### JavaScript 구조
- **모바일 메뉴** - 토글 및 링크 클릭 처리
- **IntersectionObserver** - 기본 fade-in 애니메이션 (CSS 기반)
- **네비게이션** - 스크롤 위치 기반 active 링크, smooth scroll
- **GSAP 애니메이션**:
  - `initHeroAnimation()` - Hero 섹션 진입 애니메이션
  - `initScrollAnimations()` - ScrollTrigger 기반 섹션 reveal
  - `initCardHoverEffects()` - 3D tilt 호버 효과
  - `initButtonHoverEffects()` - 버튼 탄성 효과

### 섹션 구성
Hero → About → Skills → Projects → Contact → Footer

## Design System

- 배경: 파스텔 그라데이션 (민트/블루/퍼플/핑크)
- 카드: Glassmorphism (rgba 배경 + backdrop-filter blur)
- 메인 컬러: `#2563eb` (Tailwind blue-600)
- 폰트: Pretendard
