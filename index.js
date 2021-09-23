const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task: boolean value and description
let taskList = [];

function addTask(taskList, taskDescription) {
  taskList.push({ done: false, description: taskDescription });
}

function printTaskList(taskList) {
  // 1. [ ] Take out the trash
  // 2. [x] Do the washing up
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].done) {
      // task done
      console.log(`${i + 1}. [x] ${taskList[i].description}`);
    } else {
      // task not done
      console.log(`${i + 1}. [ ] ${taskList[i].description}`);
    }
  }
}

// First mode: Reading of necessary tasks
function mode1(taskList) {
  rl.question('Introduce a new task (write [end] if you finish): ', (taskDesc) => {
    switch (taskDesc) {
      case 'end':
        console.log('No more tasks are entered');
        mode2(taskList);
        break;
      case 'exit':
        rl.close();
        break;
      default:
        addTask(taskList, taskDesc);
        console.log('The current task list is:');
        printTaskList(taskList);
        mode1(taskList);
        break;
    }
  });
}

// Second mode: Mark the necessary tasks
function markTaskAsDone(taskList, index) {
  if (index >= 0 && index < taskList.length) {
    taskList[index].done = true;
  } else {
    console.log('Invalid task number');
  }
}

function checkAllDone(taskList) {
  for (const task of taskList) {
    if (!task.done) {
      return false;
    }
  }
  return true;
}

function mode2(taskList) {
  printTaskList(taskList);
  rl.question('What tasks have you done? (1 - N): ', (taskNumber) => {
    switch (taskNumber) {
      case 'end':
      case 'exit':
        console.log('Bye bye');
        rl.close();
        break;
      default:
        markTaskAsDone(taskList, taskNumber - 1);
        // Check that all tasks are done and close the program
        if (checkAllDone(taskList)) {
          console.log("Very good, you have completed all the tasks.");
          rl.close()
        } else {
          mode2(taskList);
        }
        break;
    }
  });
}

mode1(taskList)
