let state={
    todos:[]
}


let services={
    addToDo:function(newToDo) {
        newToDo.id=state.todos.length+1;
        state.todos=[...state.todos,newToDo]
    },
    removeTodo:function(itemId) {
        const filtered=state.todos.filter(item=>{
            return item.id!==Number(itemId);
        })

        state.todos=[...filtered]
    },
    toggleComplete:function(itemId) {
        let currenttodo;
        const completeToggled=state.todos.map(item=>{
            if(item.id===Number(itemId)) {
                item.status=!item.status;
                currenttodo=item;
            }
            return item;
        })

        state.todos=[...completeToggled];
        return currenttodo;
    },
    findTodo:(itemId)=>{
        const todo=state.todos.find(item=>{
            return item.id===Number(itemId);
        })
        return todo;
    },
    toggleEdit:(itemId)=>{
        const todo=services.findTodo(itemId);
        todo.edit=!todo.edit;
        return todo;
    },
    updateValue:(itemId,value)=>{
        const newTodo=state.todos.map(item=>{
            if(item.id===Number(itemId)) {
                item.task=value;
                console.log(item);
                let currenttodo=item;
            }
            return item;
        })


        state.todos=[...newTodo];
    

    }
}