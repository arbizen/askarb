import ContentContainer from "./ContentContainer";
import {
  Card,
  CardContainer,
  CardBar,
  CardText,
  HiddenCard,
  CardInfo,
} from "./Card";
import IconButton from "./IconButton";
import { MoreVertical, Clock, User } from "react-feather";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context";
import { Menu, MenuItem } from "./Menu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showDialog } from "../redux/reducers/showDialog";
import {
  getAnsweredQuestions,
  loadingQuestions,
} from "../redux/reducers/questions";
import axios from "axios";
import { endpoint } from "../endpoint";
import { showToast } from "../redux/reducers/toast";

const AnswerCard = ({ question, answer, at, by, id, hidden }) => {
  const { icon } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => setShowMenu(!showMenu);
  const handleMenuClose = () => setShowMenu(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const hideQuestion = async (id) => {
    await axios.post(`${endpoint}/questions/update`, {
      token: user && user.data.token,
      id,
      isHidden: !hidden,
    });
    dispatch(showToast(`Question ${hidden ? "un" : ""}hidden.`));
  };
  const unanswerQuestion = async (id) => {
    await axios.post(`${endpoint}/questions/update`, {
      token: user && user.data.token,
      id,
      ansText: "",
      isAnswered: false,
      isHidden: false,
    });
    dispatch(showToast("Question unanswered."));
  };
  const cardContent = (
    <>
      <CardBar
        left={
          <>
            <Clock size={18} color={icon} />
            <p style={{ marginLeft: "10px" }}>AN • {at}</p>
          </>
        }
        right={
          <>
            {user && user.data ? (
              <>
                <IconButton onIconClick={handleMenu}>
                  <MoreVertical size={20} color={icon} />
                </IconButton>
                <Menu show={showMenu} onClose={handleMenuClose}>
                  <MenuItem onItemClick={handleMenuClose}>Edit</MenuItem>
                  <MenuItem
                    onItemClick={() => {
                      handleMenuClose();
                      unanswerQuestion(id);
                    }}
                  >
                    Unanswer
                  </MenuItem>
                  <MenuItem
                    onItemClick={() => {
                      handleMenuClose();
                      hideQuestion(id);
                    }}
                  >
                    {hidden ? "Unhide" : "Hide"}
                  </MenuItem>
                  <MenuItem
                    onItemClick={() => {
                      dispatch(showDialog(id));
                      handleMenuClose();
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <IconButton onIconClick={handleMenu}>
                  <MoreVertical size={20} color={icon} />
                </IconButton>
                <Menu show={showMenu} onClose={handleMenuClose}>
                  <MenuItem onItemClick={handleMenuClose}>
                    Request Edit
                  </MenuItem>
                  <MenuItem onItemClick={handleMenuClose}>Report</MenuItem>
                </Menu>
              </>
            )}
          </>
        }
      />
      {hidden && <CardInfo>This card is hidden.</CardInfo>}
      <CardText type="header" text={question} />
      <CardText type="body" text={answer} />
      <CardBar
        at="bottom"
        left={
          <>
            <User size={18} color={icon} />
            <p style={{ marginLeft: "10px" }}>Asked by • {by}</p>
          </>
        }
        leftfull
      />
    </>
  );
  return (
    <Card>
      {user && user.data ? (
        cardContent
      ) : hidden ? (
        <HiddenCard>Hidden by admin.</HiddenCard>
      ) : (
        cardContent
      )}
    </Card>
  );
};

export default function AnswerTab() {
  const questions = useSelector((state) => state.questions.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingQuestions());
    axios.get(`${endpoint}/questions/answered`).then(({ data }) => {
      dispatch(getAnsweredQuestions(data.questions));
    });
  }, [dispatch]);
  return (
    <ContentContainer>
      <CardContainer>
        {questions &&
          questions.answered &&
          questions.answered.map((question) => (
            <AnswerCard
              key={question._id}
              at={question.answerAt}
              question={question.queText}
              answer={question.ansText}
              by={question.askedBy}
              id={question._id}
              hidden={question.isHidden}
            />
          ))}
        {/* <AnswerCard
          at="3.02 PM"
          question="Maybe this could be a very good question for you or what, I have such question?"
          answer="Well, I generally do not like to go for a date, for I'd definitely go if I get a chance to go with someone. I mean, who wouldn't right?"
          by="Annonymous"
        /> */}
      </CardContainer>
    </ContentContainer>
  );
}
