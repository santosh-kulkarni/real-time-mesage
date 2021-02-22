function StaticMsg(props) {
    return (
        <ul>
            {props.messages.map(message => {
                return (
                    <li>{message}</li>
                );
            }) }
        </ul>
    )
}

export default StaticMsg;