import styled from "styled-components";
import { Card, CardContainer, CardBar, CardText } from "./Card";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context";
import IconButton from "./IconButton";
import { Menu, MenuItem } from "./Menu";
import { MoreVertical, Clock, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { showDialog, showAnswerDialog } from "../redux/reducers/showDialog";
import {
  getNotAnsweredQuestions,
  loadingQuestions,
} from "../redux/reducers/questions";
import axios from "axios";
import { endpoint } from "../endpoint";
import ContentContainer from "./ContentContainer";

const NotAnswerCard = ({ question, by, id, at }) => {
  const { icon } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => setShowMenu(!showMenu);
  const handleMenuClose = () => setShowMenu(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const ftch = () => {
    dispatch(loadingQuestions());
    axios.get(`${endpoint}/questions/notAnswered`).then(({ data }) => {
      dispatch(
        getNotAnsweredQuestions({
          notAnswered: data.questions,
          len: data.dataLen ? data.dataLen : 0,
        })
      );
    });
  };
  const cardContent = (
    <>
      <CardBar
        left={
          <>
            <Clock size={18} color={icon} />
            <p style={{ marginLeft: "10px" }}>AT • {at}</p>
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
                  <MenuItem
                    onItemClick={() => {
                      handleMenuClose();
                      dispatch(
                        showAnswerDialog({
                          questionId: id,
                          questionText: question,
                          by,
                        })
                      );
                    }}
                  >
                    Answer
                  </MenuItem>
                  <MenuItem onItemClick={handleMenuClose}>Details</MenuItem>
                  <MenuItem
                    onItemClick={() => {
                      handleMenuClose();
                      dispatch(showDialog(id));
                      ftch();
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
      <CardText type="body" text={question} />
      <CardBar
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
  return <Card>{cardContent}</Card>;
};

export default function NotAnsweredTab() {
  const questions = useSelector((state) => state.questions.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingQuestions());
    axios.get(`${endpoint}/questions/notAnswered`).then(({ data }) => {
      dispatch(
        getNotAnsweredQuestions({
          notAnswered: data.questions ? data.questions : [],
          len: data.dataLen ? data.dataLen : 0,
        })
      );
    });
  }, [dispatch]);
  console.log(questions);
  return (
    <ContentContainer>
      <CardContainer>
        {questions &&
          questions.notAnswered &&
          questions.notAnswered.map((question) => (
            <NotAnswerCard
              key={question._id}
              question={question.queText}
              by={question.askedBy}
              id={question._id}
              at={question.answerAt}
            />
          ))}
      </CardContainer>
      {questions &&
        questions.notAnswered &&
        !questions.isLoading &&
        questions.notAnsweredDataLen === 0 && <p>No new question found.</p>}
    </ContentContainer>
  );
}
