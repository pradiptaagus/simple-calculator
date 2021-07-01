import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';
import { FormEvent, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles({
  background: {
    backgroundColor: "#F3F4F6",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "4px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  h1: {
    marginTop: "0px"
  },
  option: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "8px",
    cursor: "pointer"
  },
  label: {
    flex: 1,
    border: "1px solid #6B7280",
    paddingLeft: "8px",
    paddingRight: "8px",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px"
  },
  multiplyIcon: {
    transform: "rotate(45deg)"
  },
  divideIcon: {
    transform: "rotate(-45deg)"
  },
  result: {
    display: "flex",
    flexDirection: "row",
    fontSize: "24px",
    marginTop: "16px"
  },
  resultLabel: {
    fontWeight: "bold",
    marginRight: "8px"
  },
  resultValue: {
    flex: 1
  },
  btnContainer: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    marginRight: "34px",
    "& button": {
      marginRight: "8px"
    },
    "& div:last-child": {
      flex: 1,
      "& button": {
        float: "right"
      }
    }
  }
})

interface CheckedList {
  value: number;
  isCheck: boolean;
}

function App() {
  const classes = useStyles();
  const [checkedList, setCheckedList] = useState<CheckedList[]>([
    {value: 10, isCheck: false},
    {value: 2, isCheck: false},
    {value: 5, isCheck: false},
  ]);
  const [result, setResult] = useState<number>(0);

  function handleChange(e: FormEvent<HTMLInputElement>) {
    const index = e.currentTarget.getAttribute("data-index") ;
    if (index) {
      const newCheckedList = [...checkedList];
      newCheckedList[parseInt(index)].isCheck = e.currentTarget.checked;
      setCheckedList(newCheckedList);
    }
  }

  function handleClickOption(e: FormEvent<HTMLDivElement>) {
    const index = e.currentTarget.getAttribute("data-index") ;
    if (index) {
      const newCheckedList = [...checkedList];
      newCheckedList[parseInt(index)].isCheck = !checkedList[parseInt(index)].isCheck;
      setCheckedList(newCheckedList);
    }
  }

  function summation() {
    const errors = validate();
    if (errors) {
      return;
    }
    
    let summary = 0;

    for (let i = 0; i < checkedList.length; i++) {
      if (checkedList[i].isCheck) {
        summary += checkedList[i].value;
      }
    }

    setResult(summary);
  }

  function substraction() {
    const errors = validate();
    if (errors) {
      return;
    }
    
    let summary = 0;

    for (let i = 0; i < checkedList.length; i++) {
      if (checkedList[i].isCheck) {
        summary -= checkedList[i].value;
      }
    }

    setResult(summary);
  }

  function multiplication() {
    const errors = validate();
    if (errors) {
      return;
    }
    
    let summary = 0;
    let firstValue = 0;

    for (let i = 0; i < checkedList.length; i++) {
      if (checkedList[i].isCheck && !firstValue) {
        summary = checkedList[i].value;
        firstValue = 1;
      } else if (checkedList[i].isCheck) {
        summary = summary * checkedList[i].value;
      }
    }

    setResult(summary);
  }

  function division() {
    const errors = validate();
    if (errors) {
      return;
    }
    
    let summary = 0;
    let firstValue = 0;

    for (let i = 0; i < checkedList.length; i++) {
      if (checkedList[i].isCheck && !firstValue) {
        summary = checkedList[i].value;
        firstValue = 1;
      } else if (checkedList[i].isCheck) {
        summary = summary / checkedList[i].value;
      }
    }

    setResult(summary);
  }

  function clear() {
    setResult(0);
    let newCheckedList = [...checkedList];
    newCheckedList = newCheckedList.map((item: CheckedList) => {
      return {
        ...item,
        isCheck: false
      }
    });
    setCheckedList(newCheckedList);
  }

  function validate() {
    const list = checkedList.filter((item: CheckedList) => item.isCheck);
    if (list.length < 2) {
      alert("Minimum 2 number must be selected.");
      return true;
    }
  }

  return (
    <div className={classes.background}>
      <Container maxWidth="xs" className={classes.container}>
        <h1 className={classes.h1}>Simple calculator App</h1>
        {checkedList.map((checkedList: CheckedList, index: number) => (
          <div className={classes.option} key={index} data-index={index} onClick={handleClickOption}>
            <div className={classes.label}>{checkedList.value}</div>
            <Checkbox name={`${checkedList.value}`} checked={checkedList.isCheck} inputProps={{"data-index": index} as React.InputHTMLAttributes<HTMLInputElement>} onChange={handleChange} />
          </div>
        ))}
        
        <div className={classes.btnContainer}>
          <div>
            <Button variant="contained" color="primary" onClick={() => summation()}><AddIcon /></Button>
            <Button variant="contained" color="primary" onClick={() => substraction()}><RemoveIcon /></Button>
            <Button variant="contained" color="primary" onClick={() => multiplication()}><AddIcon className={classes.multiplyIcon} /></Button>
            <Button variant="contained" color="primary" onClick={() => division()}><RemoveIcon className={classes.divideIcon} /></Button>
          </div>
          <div>
            <Button variant="contained" color="secondary" onClick={() => clear()}>Clear</Button>
          </div>
        </div>        

        <div className={classes.result}>
          <div className={classes.resultLabel}>Result:</div>
          <div className={classes.resultValue}>{result}</div>
        </div>
      </Container>
    </div>
  );
}

export default App;
