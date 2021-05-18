let input = document.querySelector(".input-box");
let ul = document.querySelector(".list");
let menu_shown = false;

let task_priority = {"On Going":0,"Pending":1,"Completed":2};

let task_data = {"id":null,"name":null,"task_priority":null,"status":null}
let task_data_array = [];

function remove_task(e){
    console.log(e);
    console.log(e.currentTarget)
}

function remove_element(){
    document.querySelector(".box").remove();
}

function delete_task(){
    let e = event.target;
    console.log(e);
    e = get_parent(e,"template")
    e.remove();
}

function get_parent(ele, class_name){
    while(ele.parentNode.className!= class_name)
        ele = ele.parentNode;
    return ele;
}

function create_drop_down_menu(){
    let drop_menu = document.querySelector('#drop-down-menu-temp');
    var clone = drop_menu.content.cloneNode(true);
    return clone;
}

function hide_menu(){
    let ele = document.querySelector(".drop-down-menu");
    ele.remove();
    menu_shown = false;
}

function show_menu(){
    console.log(event.target);
    if(!menu_shown){
        let menu = create_drop_down_menu();
        let div = document.querySelector(".status-div");
        div.appendChild(menu);
        menu_shown = true;
    }
    else{
        hide_menu();
    }
}

function status_(inner_text){
    if(inner_text == "pending_actions")
        return "Pending";
    else if(inner_text == "schedule")
        return "On Going";
    else if(inner_text == "task")
        return "Completed";
    else return inner_text;
}

function get_task(id){
    for(let i = 0 ; i < task_data_array.length ; i++){
        if(task_data_array[i]["ID"] == id)
            return task_data_array[i];
    }
    return {};
}

function change_priority(ele,status){
    console.log(status);
    let id = ele.id;
    let priority = task_priority[status];
    let task = get_task(id);
    task["Priority"] = priority;
    task["Status"] = status;
}

function change_status(){
    let e = event.target;
    let parent_div = get_parent(e,"choice");
    parent_div = parent_div.parentNode;
    let new_span = parent_div.querySelector(".material-icons-outlined").innerText;
    let div = document.querySelector(".status-p");
    let status = status_(e.innerText);
    div.innerText = status;
    hide_menu();
    let span = document.querySelector(".status-div-icon .material-icons-outlined");
    span.innerText = new_span;
    let main_ele = get_parent(span,"template").parentNode;
    change_priority(main_ele,status);
}

function add_task(task){
    let li = document.querySelector('#list-template');
    var clone = li.content.cloneNode(true);
    clone.querySelector(".task-div").innerText = task;
    id = "#"+uid();
    clone.querySelector(".template").id = id;
    let id2 = "#"+uid();
    clone.querySelector(".status-p").id = id2;
    ul.appendChild(clone);
    let data = {"ID":id,"Task":task,"Priority":1,"Status":"Pending"};
    task_data_array.push(data);
}

input.addEventListener("keypress",function(e){
    if(e.key == "Enter"){
        let task = input.value;
        if(!task){
            alert("Error: Can't add empty task.");
            return;
        }
        input.value="";
        add_task(task);
    }
});



                         