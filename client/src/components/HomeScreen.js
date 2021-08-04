import styled from "styled-components";
import HeaderBar from "../components/Header";
import Fab from "../components/Fab";
import { NavigationStack } from "../components/Tabs";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import AnswerTab from "./AnswerTab";
import NotAnsweredTab from "./NotAnsweredTab";
import { Dialog, DialogFooter, DialogButton } from "./Dialog";
import { Plus } from "react-feather";
import Container from "./Container";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/reducers/user";
import { hideDialog } from "../redux/reducers/showDialog";
import axios from "axios";
import { useHistory } from "react-router";
import { endpoint } from "../endpoint";

const LoadingContainer = styled.div`
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogInput = styled.input`
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

export default function HomeScreen() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const handleDialogClose = () => setShowDialog(false);
  const handleDialogOpen = () => setShowDialog(true);
  const [question, setQuestion] = useState("");
  const [tabs, setTabs] = useState([{ name: "All" }, { name: "Unanswered" }]);
  //const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const showDeleteDialog = useSelector((state) => state.showDialog.value);
  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const history = useHistory();
  const submitQuestion = async () => {
    const data = {
      queText: question,
      askedBy: "Annonymous",
      answerAt: "06:12 PM",
      isAnswered: false,
      ansText: "",
    };
    if (question) {
      await axios.post(`${endpoint}/questions/add`, data);
      setQuestion("");
      handleDialogClose();
    } else {
      handleDialogClose();
    }
  };
  const deleteQuestion = async () => {
    await axios.post(`${endpoint}/questions/delete`, {
      id: showDeleteDialog && showDeleteDialog.questionId,
      token: user && user.data.token,
    });
    history.push("/homepage");
  };
  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setTabs([{ name: "All" }, { name: "Unanswered" }, { name: "Answer" }]);
    } else {
      setTabs([{ name: "All" }, { name: "Unanswered" }]);
    }
  }, [user]);
  return (
    <Container>
      <HeaderBar />
      <NavigationStack tabs={tabs}>
        {(activeTab, isLoading, tabData) => (
          <>
            {isLoading && (
              <LoadingContainer>
                <HashLoader color="#fff" size={30} />
              </LoadingContainer>
            )}
            {!isLoading && activeTab === 0 && <AnswerTab data={tabData} />}
            {!isLoading && activeTab === 1 && <NotAnsweredTab data={tabData} />}
          </>
        )}
      </NavigationStack>
      <Dialog
        defaultView
        title={question || "Ask a cool question?"}
        secondaryTitle="Please make sure you do not ask any personal question and that you are honest enough to ask the questioni? You understand or what?"
        show={showDialog}
        onProceed={submitQuestion}
        onClose={handleDialogClose}
      >
        <DialogInput
          onChange={handleQuestionChange}
          type="text"
          placeholder="Please type your question"
        />
      </Dialog>
      <Dialog
        defaultView={false}
        title="Delete a question"
        secondaryTitle="Once deleted, this process can not be undone."
        show={showDeleteDialog && showDeleteDialog.show}
        onClose={() => dispatch(hideDialog())}
      >
        <DialogFooter>
          <DialogButton
            onClick={() => {
              deleteQuestion();
              dispatch(hideDialog());
            }}
          >
            Delete
          </DialogButton>
        </DialogFooter>
      </Dialog>
      <Fab onClick={handleDialogOpen}>
        <Plus />
      </Fab>
    </Container>
  );
}
