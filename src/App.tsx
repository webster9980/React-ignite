import {Post} from "./components/Post"
import {Header} from "./components/Header"
import { Sidebar } from "./components/Sidebar"

import styles from './App.module.css'
import './global.css'

interface content{
  type: 'paragraph' | 'link';
  content: string;
}

//author: {avatar_url = "", name="", role(cargo))="" }
//PublishedAt: Date
//content: ""
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: "Diego fernandes",
      role: "CTO Rocketseat"
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋' },
      {type: 'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type:'link', content: 'jane.design/doctorcare'},  
    ],
    PublishedAt: new Date('2022-06-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: "webster ribeiro",
      role: "Front-end developer Rocketseat"
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋' },
      {type: 'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type:'link', content: 'jane.design/doctorcare'},  
    ],
    PublishedAt: new Date('2022-09-06 20:00:00'),
  },
]

//iteração

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map( posts =>{
            return (
              <Post
                key={posts.id}
                author={posts.author}
                content={posts.content}
                PublishedAt={posts.PublishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  )
}

export default App;

