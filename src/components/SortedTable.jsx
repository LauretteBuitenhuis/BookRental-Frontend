import { useContext, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import AuthContext from "../store/auth-context";

function SortedTableHeader(props) {
  const {
    name,
    onClick: onClickHandler = () => {},
    isBeingSorted = false,
    isSortAscending = false,
  } = props;
  const sortIcon = isBeingSorted ? (isSortAscending ? "▲" : "▼") : null;

  return (
    <th>
      <span onClick={onClickHandler}>
        {name} {sortIcon}
      </span>
    </th>
  );
}

export function SortedTable(props) {
  const { showDeleteModal, updateBook, data, columns = [] } = props;

  const [sortKey, setSortKey] = useState("title");
  const [isSortAscending, setIsSortAscending] = useState(true);

  const sortedDataWithoutOrder = data.sort((a, b) =>
    a[sortKey].localeCompare(b[sortKey])
  );

  const sortedData = isSortAscending
    ? sortedDataWithoutOrder
    : sortedDataWithoutOrder.reverse();

  const auth = useContext(AuthContext);
  console.log(auth.isAdmin);

  if (auth.isAdmin === true) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <SortedTableHeader
                key={index}
                name={column.key}
                isBeingSorted={sortKey === column.key}
                isSortAscending={isSortAscending}
                onClick={
                  column.sortable === true
                    ? () => {
                        sortKey === column.key
                          ? setIsSortAscending((value) => !value)
                          : setIsSortAscending(true);
                        setSortKey(column.key);
                      }
                    : () => {}
                }
              />
            ))}
            <th>Wijzig</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={`row-${index}`}>
              {columns.map(({ key }, columnIndex) => (
                <td key={`col-${columnIndex}`}>{item[key] ?? ""}</td>
              ))}
              <td className="table-buttons">
                <span onClick={() => updateBook(item)}>
                  <BsPencilFill className="icon" />
                </span>
                <span onClick={() => showDeleteModal(item)}>
                  <BsTrashFill className="icon" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <SortedTableHeader
              key={index}
              name={column.key}
              isBeingSorted={sortKey === column.key}
              isSortAscending={isSortAscending}
              onClick={
                column.sortable === true
                  ? () => {
                      sortKey === column.key
                        ? setIsSortAscending((value) => !value)
                        : setIsSortAscending(true);
                      setSortKey(column.key);
                    }
                  : () => {}
              }
            />
          ))}
          <th>Wijzig</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={`row-${index}`}>
            {columns.map(({ key }, columnIndex) => (
              <td key={`col-${columnIndex}`}>{item[key] ?? ""}</td>
            ))}
            <td className="table-buttons">
              <span onClick={() => showDeleteModal(item)}>
                <button>Reserveer</button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
