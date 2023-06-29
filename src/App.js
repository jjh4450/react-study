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

function Create(props){
  return(
    <article>
      <h2>Create</h2>
      <form action='/create_process' method='post' onSubmit={(event)=>{
        event.preventDefault(); // form태그의 기본동작을 막는다. (action의 주소로 이동하지 않는다.)
        const title = event.target.title.value; // title이라는 name을 가진 태그의 value를 가져온다.
        const body = event.target.body.value; // body라는 name을 가진 태그의 value를 가져온다.
        // console.log(title, body);
        props.onCreate(title, body); // App.js의 onCreate()를 실행한다.
      }}>
        {/* 이하는 전형적인 form태그이다. */}
        <p><input type='text' name='title' placeholder='title'></input></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit'></input></p>
      </form>
    </article>
  );
}

function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return(
    <article>
      <h2>Update</h2>
      <form action='/create_process' method='post' onSubmit={(event)=>{
        event.preventDefault(); // form태그의 기본동작을 막는다. (action의 주소로 이동하지 않는다.)
        const title = event.target.title.value; // title이라는 name을 가진 태그의 value를 가져온다.
        const body = event.target.body.value; // body라는 name을 가진 태그의 value를 가져온다.
        // console.log(title, body);
        props.onUpdate(title, body); // App.js의 onCreate()를 실행한다.
      }}>
        {/*
          onchange 와 onChange의 차이
          onchange는 input태그의 값이 바뀔 때마다 실행된다.
          onChange는 input태그의 값이 바뀌고 엔터를 치거나 포커스를 잃었을 때 실행된다.
          onChange를 사용하지 않는다면 값이 수정되지 않는다.
          이유는 리엑트가 value태그에 지정된 input태그의 값을 관리하기 때문이다.
          따라서 onChange를 사용해야 리엑트가 input태그의 값을 관리할 수 있다.
        */}
        <p><input type='text' name='title' placeholder='title' value={title} onChange={event=>{
          // console.log(event.target.value);
          setTitle(event.target.value);
        }}></input></p>
        <p><textarea name='body' placeholder='body' value={body} onChange={event=>{
          // console.log(event.target.value);
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type='submit' value="Update"></input></p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('welcome');
  const [selectedId, setSelectedId] = useState(null); // topics의 id와 같다.
  const [nextid, setNextId] = useState(4); // topics의 다음 id상태를 관리한다.
  const [topics, setTopics] = useState([ // topics를 useState로 관리한다.
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'javascript is ...'}
  ]);

  let content = null;
  let contextControl = null;

  if(mode === 'welcome'){
    content = <Article title='Welcome' body = 'Hello Web'></Article>
  }else if(mode === 'read'){
    content = <Article title={topics[selectedId-1].title} body={topics[selectedId-1].body}></Article>
    contextControl = <li><a href={'/Update/'+selectedId} onClick={event=>{
      event.preventDefault();
      setMode('update');
    }}>Update</a></li>
  }else if(mode === 'create'){ // 생성 버튼을 눌렀을 때
    content = <Create onCreate={(title, body)=>{ // Create 컴포넌트의 onCreate 함수를 실행한다.
      const newTopics = {id:nextid, title:title, body:body};
      setNextId(nextid+1); // 다음 id를 1 증가시킨다.
      if(selectedId === null){ // 선택된 id가 없다면 (selectedId: content에서 내용물을 고를때 사용되는 변수)
        setSelectedId(nextid); // 선택된 id를 다음 id로 설정한다.
      }
      setTopics([...topics, newTopics]); // topics에 newTopics를 추가한다.
      /*
        ...은 spread operator라고 한다.
        topics의 내용을 그대로 가져오고 newTopics를 추가한다.
        복사를 하는 이유는 리엑트가 상태를 변경된 것을 감지하도록 하기 위해서이다.
      */
      setMode('read'); // App 함수의 content 항목을 read 모드로 변경 -> 새로 생성된 내용을 보여준다.
    }}></Create>
  }else if(mode === 'update'){
    content = <Update title = {topics[selectedId-1].title} body = {topics[selectedId-1].body} onUpdate={(title, body)=>{
      const newTopics = [...topics]; // topics를 복사한다.
      newTopics[selectedId-1].title = title; // 복사한 topics의 내용을 변경한다.
      newTopics[selectedId-1].body = body; // 복사한 topics의 내용을 변경한다.
      setTopics(newTopics); // 변경한 내용을 적용한다.
      setMode('read'); // App 함수의 content 항목을 read 모드로 변경 -> 새로 생성된 내용을 보여준다.
    }}></Update>
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
      <ul>
        <li><a href='/create' onClick={(event)=>{ // 생성 버튼
            event.preventDefault(); // a태그의 기본동작을 막는다.(페이지 이동을 막음)
            setMode('create'); // App 함수의 content 항목을 create 모드로 변경
          }
          }>create</a>
        </li>
        {contextControl}
      </ul>
      
    </div>
  );
}

export default App;
