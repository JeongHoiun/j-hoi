회사에서 Client형 도구를 만들기 위해 Electron을 사용하기로 했다.
Electron으로 개발하는 과정을 기록하기 위해 포스트를 작성한다.
## Electron을 사용하는 이유
- 기존 사내 도구 중 Electron으로 되어있는 Client가 있음 (+ Angular)
- 팀원들이 React에 익숙하기 때문에 React와 함께 사용할 수 있음
- 크로스 플랫폼이 가능함 (Linux까지)
## Electron 설치
```sh
npm init
```
- 진입점은 `main.js`(typescript 설정 후 변경)
- description, author 없으면 나중에 빌드 안될 수 있음.

- electron 설치
```sh
npm install --save-dev electron
```
### Typescript 설치 
```sh
npm install --save-dev typescript
```

```sh
npx tsc --init
```

- `tsconfig.json` 설정에서 `outDir`을 설정해줌
```json
//tsconfig.json
...
	outDir : './build'
...
```

- `package.json`에 typescript compile과 debug 스크립트 설정
- electron이 시작되는 진입점 변경
``` json
// package.json
...
"main": "build/main.js",
"script" : {
	"compile": "tsc && cp -f index.html build",
    "start": "npm run compile && electron ."	
}
...
```

## Electron main 작성
- index.html 생성
```html
<!--index.html-->
<!DOCTYPE html>  
<html lang="en">  
	<head>  
		<meta charset="UTF-8">  
		<!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->  
		<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">  
		<title>Hello World!</title>  
	</head>  
	<body>  
		<h1>Hello World!</h1>  
		We are using Node.js <span id="node-version"></span>,  
		Chromium <span id="chrome-version"></span>,  
		and Electron <span id="electron-version"></span>.  
	</body>  
</html>
```
- main.ts 생성
	- `app` : Application 이벤트의 생명 주기를 제어
	- `BrowserWindow`: Application의 창을 생성, 관리
```typescript
//main.ts
import {app, BrowserWindow } from 'electron';

app.whenReady().then(() => {
	createWindow()
})
  
const createWindow = () => {
	const win = new BrowserWindow({
	  width: 800,
	  height: 600
	})
	
	win.loadFile('index.html')
}
```
## OS별 Window 생명주기
- Window와 Linux OS는 창이 닫히면 Application이 완전히 종료된다.
- 별도로 종료를 구현하고자 하는 경우 다음과 같이 구현하면 된다.
```ts
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```
- MacOS의 경우 창을 닫는다고 해서 Application이 완전히 종료되지 않는다.
```ts
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
})  
```
## preload 스크립트 작성
- 메인 프로세스에서 node의 정보에 접근하는 것은 쉽지 않다.
- preload 스크립트를 작성하여 node 정보에 접근하여 버전정보를 가져올 수 있다.
- preload는 BrowserWindow의 `webPreferences.preload` 옵션에 전달하여 스크립트 실행할 수 있다.
```ts
// preload.ts
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector)
    if (element && text) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

```ts
// main.ts
...
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
...
```