import Responsive from "../components/common/Responsive";
import TagBoxContainer from "../containers/write/TagBoxContainer";
// import Editor from "../components/write/Editor";
// import TagBox from "../components/write/TagBox";
import WriteActionButtons from "../components/write/WriteActionButtons";
import EditorContainer from "../containers/write/EditorContainer";

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;
