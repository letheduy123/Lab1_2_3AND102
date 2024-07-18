import { createSlice } from "@reduxjs/toolkit";
//1. khai báo khởi tạo state
const initialState = {
    listTodo :[] // chứa danh sách công việc
}
//2. thiết lập cho reducer và định nghĩa các action
const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers:{
        addTodo (state, action){
            state.listTodo.push( action.payload );
        },
          // có thêm action nào khác thì viết vào đây
       //delete
       deleteTodo (state, action){
        // xóa phần tử ra khỏi mảng
        // điều kiện gọi hàm: truyền vào cho hàm payload là id của dòng cần xóa
        state.listTodo = state.listTodo.filter(row => row.id !== action.payload);
},
updateTodo (state, action){
    // lấy tham số truyền vào
    const {id, title,content,date,type,money} = action.payload;
    // tìm bản ghi phù hợp với tham số truyền vào
    const todo = state.listTodo.find(row => row.id === id);
    // update
    if(todo){
        todo.title = title;
        todo.content=content;// gán giá trị
        todo.date = date;
        todo.type = type;
        todo.money =money ;


    }
}
        
    }
});
// export các thành phần để bên screen có thể sử dụng
export const {addTodo,deleteTodo,updateTodo} = todoSlice.actions;
export default todoSlice.reducer;