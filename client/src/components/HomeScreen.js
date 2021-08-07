import styled from "styled-components";
import HeaderBar from "../components/Header";
import Fab from "../components/Fab";
import { NavigationStack } from "../components/Tabs";
import { useEffect, useRef, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import AnswerTab from "./AnswerTab";
import NotAnsweredTab from "./NotAnsweredTab";
import { Dialog } from "./Dialog";
import { Plus } from "react-feather";
import Container from "./Container";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/reducers/user";
import { hideDialog, hideAnswerDialog } from "../redux/reducers/showDialog";
import axios from "axios";
import { endpoint } from "../endpoint";
import { getTimeNow } from "../extra/time";
import Toast from "./Toast";
import { showToast } from "../redux/reducers/toast";
import {
  getNotAnsweredQuestions,
  getAnsweredQuestions,
  loadingQuestions,
} from "../redux/reducers/questions";

const LoadingContainer = styled.div`
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogInputHolder = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  padding: 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const DialogInput = (props) => {
  const container = useRef(null);
  useEffect(() => {
    container.current.focus();
  }, []);
  return <DialogInputHolder ref={container} {...props} />;
};

export default function HomeScreen() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const handleDialogClose = () => setShowDialog(false);
  const handleDialogOpen = () => setShowDialog(true);
  const [question, setQuestion] = useState("");
  const [tabs, setTabs] = useState([{ name: "All" }, { name: "Unanswered" }]);
  //const [dialogue, setdialogue] = useState(false);
  const dialogue = useSelector((state) => state.showDialog.value);
  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const allQuestions = useSelector((state) => state.questions.value);
  const [isLoading, setIsLoading] = useState(false);
  const submitQuestion = async () => {
    setIsLoading(true);
    const data = {
      queText: question,
      askedBy: "Annonymous",
      answerAt: getTimeNow(),
      isAnswered: false,
      ansText: "",
    };
    if (question) {
      await axios.post(`${endpoint}/questions/add`, data);
      setQuestion("");
      handleDialogClose();
      dispatch(showToast("Question submitted."));
      setIsLoading(false);
    } else {
      handleDialogClose();
      setIsLoading(false);
    }
  };
  const submitAnswer = async () => {
    setIsLoading(true);
    await axios.post(`${endpoint}/questions/update`, {
      id: dialogue && dialogue.questionId,
      ansText: question,
      answerAt: getTimeNow(),
      isAnswered: true,
      token: user && user.data.token,
    });
    dispatch(hideAnswerDialog());
    dispatch(showToast("Answer added."));
    setQuestion("");
    setIsLoading(false);
  };
  const deleteQuestion = async () => {
    await axios.post(`${endpoint}/questions/delete`, {
      id: dialogue && dialogue.questionId,
      token: user && user.data.token,
    });
    dispatch(showToast("Question deleted."));
  };
  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setTabs([{ name: "Answered" }, { name: "Unanswered" }]);
    } else {
      setTabs([{ name: "Answered" }, { name: "Unanswered" }]);
    }
  }, [user]);
  return (
    <Container>
      <HeaderBar />
      <NavigationStack tabs={tabs}>
        {(activeTab) => (
          <>
            {/* {isLoading && (
              <LoadingContainer>
                <HashLoader color="#fff" size={30} />
              </LoadingContainer>
            )} */}
            {allQuestions && allQuestions.isLoading && (
              <LoadingContainer>
                <HashLoader color="#fff" size={30} />
              </LoadingContainer>
            )}
            {activeTab === 0 && <AnswerTab />}
            {activeTab === 1 && <NotAnsweredTab />}
          </>
        )}
      </NavigationStack>
      {/* Ask question dialogue */}
      <Dialog
        defaultView
        title={question || "Ask a cool question?"}
        secondaryTitle="Please make sure you do not ask any personal question and that you are honest enough to ask the questioni? You understand or what?"
        show={showDialog}
        proceedText={isLoading ? "Asking..." : "Ask"}
        onProceed={submitQuestion}
        onClose={() => {
          handleDialogClose();
          setQuestion("");
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitQuestion();
          }}
        >
          <DialogInput
            onChange={handleQuestionChange}
            value={question}
            type="text"
            placeholder="Please type your question"
          />
        </form>
      </Dialog>
      {/* Delete question dialogue */}
      <Dialog
        defaultView
        title="Delete a question"
        secondaryTitle="Once deleted, this process can not be undone."
        show={dialogue && dialogue.show}
        onClose={() => {
          dispatch(hideDialog());
          setQuestion("");
        }}
        proceedText="Delete"
        onProceed={() => {
          deleteQuestion();
          dispatch(hideDialog());
          dispatch(loadingQuestions());
          axios.get(`${endpoint}/questions/answered`).then(({ data }) => {
            dispatch(
              getAnsweredQuestions({
                answered: data.questions ? data.questions : [],
                len: data.dataLen ? data.dataLen : 0,
              })
            );
          });
        }}
      />
      {/* Answer question dialogue */}
      <Dialog
        title={dialogue && dialogue.questionText}
        secondaryTitle={`You are answering this particular question asked by ${
          dialogue && dialogue.by
        }`}
        show={dialogue && dialogue.showAnswerDialog}
        onClose={() => {
          dispatch(hideAnswerDialog());
          setQuestion("");
        }}
        proceedText={isLoading ? "Adding..." : "Answer"}
        onProceed={() => {
          submitAnswer();
          dispatch(loadingQuestions());
          axios.get(`${endpoint}/questions/notAnswered`).then(({ data }) => {
            dispatch(
              getNotAnsweredQuestions({
                notAnswered: data.questions ? data.questions : [],
                len: data.dataLen ? data.dataLen : 0,
              })
            );
          });
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAnswer();
            dispatch(loadingQuestions());
            axios.get(`${endpoint}/questions/notAnswered`).then(({ data }) => {
              dispatch(
                getNotAnsweredQuestions({
                  notAnswered: data.questions ? data.questions : [],
                  len: data.dataLen ? data.dataLen : 0,
                })
              );
            });
          }}
        >
          <DialogInput
            onChange={handleQuestionChange}
            value={question}
            placeholder="Write your answer"
            autoFocus
          />
        </form>
      </Dialog>
      <Fab onClick={handleDialogOpen}>
        <Plus />
      </Fab>
      <Toast />
    </Container>
  );
}
