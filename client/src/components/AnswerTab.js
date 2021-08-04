import ContentContainer from "./ContentContainer";
import { Card, CardContainer, CardBar, CardText } from "./Card";
import IconButton from "./IconButton";
import { MoreVertical, Clock, User } from "react-feather";
import { useContext, useState } from "react";
import { ThemeContext } from "../context";
import { Menu, MenuItem } from "./Menu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showDialog } from "../redux/reducers/showDialog";

const AnswerCard = ({ question, answer, at, by, id }) => {
  const { icon } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => setShowMenu(!showMenu);
  const handleMenuClose = () => setShowMenu(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  return (
    <>
      <Card>
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
                    <MenuItem onItemClick={handleMenuClose}>Hide</MenuItem>
                    <MenuItem onItemClick={handleMenuClose}>Edit</MenuItem>
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
      </Card>
    </>
  );
};

export default function AnswerTab({ data }) {
  return (
    <ContentContainer>
      <CardContainer>
        {data &&
          data.map((question) => (
            <>
              {question.isAnswered && (
                <AnswerCard
                  key={question._id}
                  at={question.answerAt}
                  question={question.queText}
                  answer={question.ansText}
                  by={question.askedBy}
                  id={question._id}
                />
              )}
            </>
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
