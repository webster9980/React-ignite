import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css'
 
interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content{
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps{
    author: Author;
    PublishedAt: Date;
    content: Content[];
}

export function Post({author, PublishedAt, content}: PostProps){
    const [newCommentText, setNewCommentText] = useState('')
    const [comments, setComments] = useState([
        'Post muito bancana, hein?!',
        'aqui tem outro comentário'
    ])

    const PublishedDateFormatted = format(PublishedAt, "d 'de' LLLL 'às' HH:mm 'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(PublishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent){
        event.preventDefault(); 

        // const newCommentText = event.target.comment.value;
        setComments([...comments, newCommentText]);
        setNewCommentText('')
    }

    function hadleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório');
    }

    function deleteComment(commentToDelete: string){
        const commentWithoutDeleteOne = comments.filter(comment =>{
            return comment != commentToDelete;
        }) 
        setComments(commentWithoutDeleteOne);
    }


    //são variáveis que eu quero que o componente monitore
    const isNewCommentEmpty = newCommentText.length  === 0; 

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        hasBorder
                        src={author.avatarUrl}
                        alt=''                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={PublishedDateFormatted} dateTime={PublishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line=>{
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>;
                    }else if(line.type === 'link'){
                        return <p key={line.content}><a href="#">{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu Feedback</strong>
                <textarea 
                    name='comment'
                    placeholder="Deixe um comentário"
                    onChange={hadleNewCommentChange}
                    value={newCommentText}
                    onInvalid={handleNewCommentInvalid}
                    required={true}   
                />
                <footer>
                    <button 
                        type="submit" 
                        disabled={isNewCommentEmpty}>
                            Publicar
                    </button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment =>{
                    return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
                })}
            </div>
        </article>
    );
}