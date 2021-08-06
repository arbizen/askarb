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

const ContentContainer = styled.div`
  height: auto;
  width: 100%;
  color: #fff;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const NotAnswerCard = ({ question, by, id, at }) => {
  const { icon } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => setShowMenu(!showMenu);
  const handleMenuClose = () => setShowMenu(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
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
      dispatch(getNotAnsweredQuestions(data.questions));
    });
  }, [dispatch]);
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
    </ContentContainer>
  );
}
