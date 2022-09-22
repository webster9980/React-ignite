// props: {author: webster ribeiro , content: lorem}

export function Post(props){
    return (
        <div>
            <strong>{props.author}</strong>
            <div>{props.content}</div>
        </div>
    )
}

