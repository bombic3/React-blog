import { useSelector } from "react-redux";
import Header from "../../components/common/Header";


const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return (
    <div>
      <Header user={user} />
    </div>
  );
};

export default HeaderContainer;