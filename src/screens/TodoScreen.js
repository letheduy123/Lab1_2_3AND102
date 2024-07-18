import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../redux/reducers/todoReducer";
import {StyleSheet, Button, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
const TodoScreen  =()=>{
    //1. Khai báo các state để thực hiện thêm
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [money, setMoney] = useState('');

    const [search, setSearch] = useState('');

    // Dành cho sửa: Cần có state lưu trạng thái đang sửa bản ghi nào
  const [editTitle, setEditTitle] = useState('');// chuỗi tiêu đề
  const [idEdit, setIdEdit] = useState(null); //lưu id bản ghi cần sửa
  const [editContent, setEditContent] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editType, setEditType] = useState('');
  const [editMoney, setEditMoney] = useState('');
   
    //lấy  danh sách dữ liệu
    const  listTodo =  useSelector(state=>state.listTodo.listTodo);
    // chú ý: state.listTodo.listTodo  thì state.listTodo là cái ở trong store, còn listTodo cuối cùng là cái trong reducer
    // lấy đối tượng để điều khiển các action
    const dispatch = useDispatch();// của redux
    // hàm xử lý việc thêm
    const handleAddTodo = ()=>{
        let duLieuThem = { id: Math.random().toString(), title,content,date,type,money:money };
        dispatch( addTodo ( duLieuThem )  );
        //them xong thì trống
        // setTitle('');
        // setContent('');
        // setDate('');
        // setType('');
        // setMoney('');
    }
     
    //ham xoa
    // hàm xử lý xóa
  const handleDeleteTodo = (id)=>{
    dispatch(deleteTodo (id));
}
//ham su li sua
const handleEdit = (id, title,content,date,type,money) =>{
    // hàm này để  ẩn hiện form sửa
    setEditTitle(title);
    setEditContent(content);
    setEditDate(date);
    setEditType(type);
    setEditMoney(money);

    setIdEdit(id);
}
// hàm lưu kết quả sửa
const handleUpdate =()=>{
    if(editTitle.trim() !== ''){
        // có nội dung sửa
        dispatch( updateTodo ({id: idEdit, title: editTitle,content:editContent,date:editDate,type:editType,money:editMoney }) );
        setEditTitle('');
        setEditContent('');
        setEditDate('');
        setEditType('');
        setEditMoney('');

        setIdEdit(null);
    }
}

    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
        return listTodo.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
    }
      // Tính tổng số tiền thu và chi
      const totalIncome = listTodo.reduce((sum, todo) => todo.type === 'thu' ? sum + parseFloat(todo.money) : sum,0);
      const totalExpense = listTodo.reduce((sum, todo) => todo.type === 'chi' ? sum + parseFloat(todo.money) : sum,0);
    return (
         // nội dung return bạn xem trong ảnh dưới
       

        
         <ScrollView>
           
           <KeyboardAvoidingView>
            <View style={st.container}>
            <TextInput style={st.input} placeholder="Tìm kiếm theo tiêu đề" value={search} onChangeText={setSearch} />

            <View style={st.summaryContainer}>
                        <Text style={st.summaryText}>Tổng thu: {totalIncome}</Text>
                        <Text style={st.summaryText}>Tổng chi: {totalExpense}</Text>
                    </View>

            <TextInput style={st.input} placeholder="Nhập title" onChangeText={setTitle} />
            <TextInput style={st.input} placeholder="Nhập content " onChangeText={setContent} />
            <TextInput style={st.input} placeholder="Nhập date" onChangeText={setDate} />
            <TextInput style={st.input} placeholder="Nhập type" onChangeText={setType} />
            <TextInput style={st.input} placeholder="Nhập money" onChangeText={setMoney} keyboardType="numeric" />
            <View style={{width:100,alignSelf:'center',margin:10}}>
            <Button title="Thêm việc" onPress={handleAddTodo} />
            {/* in thong tin ra man hinh */}

        </View>
        {
 handleSearch().map(row =>(
    <View key={row.id}
     style={{margin:10,padding:10, borderColor:'blue',borderWidth:1,borderRadius:10,backgroundColor:'#F5DEB3'}}>

        {
 (idEdit === row.id)?
                          (<>
                              <TextInput
                                      value={editTitle}
                                      onChangeText={setEditTitle}
                                      onBlur={handleUpdate}
                                  
                                  />
                                  <TextInput
                                      value={editContent}
                                      onChangeText={setEditContent}
                                      onBlur={handleUpdate}
                                      
                                      
                                  />
                                   <TextInput
                                      value={editDate}
                                      onChangeText={setEditDate}
                                      onBlur={handleUpdate}
                                      
                                  />
                                   <TextInput
                                      value={editType}
                                      onChangeText={setEditType}
                                      onBlur={handleUpdate}
                                      
                                  />
                                   <TextInput
                                      value={editMoney}
                                      onChangeText={setEditMoney}
                                      onBlur={handleUpdate}
                                      
                                  />
                                 
                                  
                                  <Button title="Update" onPress={handleUpdate} />
                          </>
                          )
                      :
                          (
                              <>
 <Text style={st.tieude}>{row.title} </Text>
        <Text style={st.noidung}>{row.content} </Text>
        <Text style={st.noidung}>{row.date} </Text>
        <Text style={st.noidung}>{row.type} </Text>
        <Text style={st.noidung}>{row.money} </Text>
        {/* //xóa nha */}
        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>handleDeleteTodo(row.id)} >
                                    <Text style={{color: 'red',fontWeight:'600',fontSize:20}}>Xóa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleEdit(row.id, row.title,row.content,row.date,row.type,row.money)}>
                                      <Text style={{color: 'blue',fontWeight:'600',fontSize:20}}>Edit</Text>
                                  </TouchableOpacity>

        </View>
                              </>
                              )
        }




        
       
        
      </View>
))
        }



       
         </View>
            
  
         </KeyboardAvoidingView>
         </ScrollView>
       
         
    );
}
export default TodoScreen
const st = StyleSheet.create({
input:{
    borderWidth:1,borderColor:'gray',width:'98%',height:50,marginTop:20,padding:10,alignSelf:'center',borderRadius:10,fontSize:18,fontWeight:'800'
},
tieude:{
    fontSize:25,
  
    color:'red',
    fontWeight:'600'
},
noidung:{
    fontSize:20,
    color:'black',
    fontWeight:'600'
},
container:{
    flex:1,
    backgroundColor:'#F5DEB3'
},
summaryText:{
    fontSize:20,
    color:'black',
    fontWeight:'600',
    margin:7
}
});