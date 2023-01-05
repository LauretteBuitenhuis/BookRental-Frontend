import { useContext } from "react";
import { MdLibraryAdd } from "react-icons/md";
import AuthContext from "../store/auth-context";

export function AdminButton(props) {
  const auth = useContext(AuthContext);
  const { setAddModus, onClick: onClickHandler, label } = props;

  if (auth.isAdmin === true) {
    return (
      <div onClick={onClickHandler}>
        {label}
        <MdLibraryAdd className="add-icon" onClick={() => setAddModus(true)} />
      </div>
    );
  }
  return null;
}
