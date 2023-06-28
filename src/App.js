import logo from './logo.svg';
import './App.css';

function Header(props){
  // console.log('props', props, props.title);
  return(
    <header>
      <h1><a href='/' onClick={function(event){
        event.preventDefault(); // a태그의 기본동작을 막는다.
        props.onChageMode(); // App.js의 onChageMode()를 실행한다.
      }}>{props.title}</a></h1>
    </header>
  );
}

function Nav(props){
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let topic = props.topics[i];
    lis.push(<li key={topic.id}><a href={'/read/'+topic.id}>{topic.title}</a></li>);
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
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'javascript is ...'}
  ]
  return (
    <div>
      <Header title='BAM' onChageMode={function(){
        alert('hi');
      }}></Header>
      <Nav topics={topics}></Nav>
      <Article title='Welcome' body = 'Hello Web'></Article>
      <Article title='hi' body = 'react'></Article>
      <Article title='pretty' body = 'cool'></Article>
    </div>
  );
}

export default App;
