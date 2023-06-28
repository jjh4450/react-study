import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  // console.log('props', props, props.title);
  return(
    <header>
      <h1><a href='/' onClick={(event)=>{ // a태그를 클릭했을 때(on'c'lick != on'C'lick)
        /*
          갑자기 등장한 event 매개변수에 대하여
          react는 이벤트를 처리할 때 이벤트 객체를 매개변수로 전달한다.
          이벤트 객체는 이벤트가 발생한 태그의 정보를 가지고 있다.
          아래 Nav함수의 onClick에 대한 설명을 보면 이해가 빠를 것이다.
        */
        event.preventDefault(); // a태그의 기본동작을 막는다.
        props.onChangeMode(); // App.js의 onChangeMode()를 실행한다.
      }}>{props.title}</a></h1>
    </header>
  );
}

function Nav(props){
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let topic = props.topics[i];
    lis.push(
    <li key={topic.id}>
      <a id = {topic.id} href={'/read/'+topic.id} onClick={event=>{ //인자가 하나라면 () 생략 가능
        /*
          id 태크가 추가된 이유
          리엑트에서 반복문을 사용할 때는 고유한 key를 사용해야한다.
          그래서 id를 사용했다.
        */
        event.preventDefault(); // a태그의 기본동작을 막는다.
        props.onChangeMode(event.target.id); // App.js의 onChangeMode()를 실행한다.
        /*
          event.target은 이벤트를 발생시킨 태그를 가리킨다.
          이 상황에서는 a태그를 가리킨다.
          따라서 event.target.id는 a태그의 id를 가리킨다.
          a태크의 id는 topics의 id와 같다.
        */
      }}>
        {topic.title}
      </a>
  </li>
             );
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article(props){
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}


function App() {
  const [mode, setMode] = useState('welcome');
  const [selectedId, setSelectedId] = useState(null); // topics의 id와 같다.
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'javascript is ...'}
  ]

  let content = null;
  if(mode === 'welcome'){
    content = <Article title='Welcome' body = 'Hello Web'></Article>
  }else if(mode === 'read'){
    content = <Article title={topics[selectedId-1].title} body={topics[selectedId-1].body}></Article>
  }

  return (
    <div>
      <Header title='WEEEEB' onChangeMode={()=>{
        setMode('welcome');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('read');
        setSelectedId(_id);
      }}></Nav>
      {content}
      {/* <Article title='Welcome' body = 'Hello Web'></Article> */}
      {/* <Article title='hi' body = 'react'></Article>
      <Article title='pretty' body = 'cool'></Article> */}
    </div>
  );
}

export default App;
