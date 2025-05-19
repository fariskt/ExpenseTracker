import { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline, MdSearch } from "react-icons/md";
import ExpenseFormModal from "../Dashboard/Forms/ExpenseForm";
import useUIStore from "../../store/useUIForm";
import { useExpenses } from "../../hooks/useExpenses";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AxiosInstance from "../../Api/AxiosInstance";
import DeleteButton from "../../Components/ui/DeleteButton";
import AddButton from "../../Components/ui/AddButton";
import { searchHook } from "../../hooks/useSearch";
import ProgressLoader from "../../Components/ui/ProgressLoader";
import { useDeleteSelectedId } from "../../hooks/useSelectIdDelete";

const ExpenseDetails = () => {
  const { showForm, setShowForm } = useUIStore();
  const { data: expenses, refetch, isLoading } = useExpenses();
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [deleteExpenseId, setExpenseDeleteId] = useState(null);
  const [selectRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const {mutate:deleteSelectedExpenseMutation, isPending:selectedDeleteIsPending } = useDeleteSelectedId("expenses")

  const expenseDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  const { mutate: deleleteExpenseMutaion, isPending } = useMutation({
    mutationFn: async (id) => {
      await AxiosInstance.delete(`/expenses/delete/${id}`);
    },
    onSuccess: () => {
      refetch();
      toast.success("Expense deleted Successfully");
    },
    onError: () => {
      toast.error("Error deleting Expense");
    },
  });

  const deleteExpense = (expenseID) => {
    deleleteExpenseMutaion(expenseID);
    setExpenseDeleteId(expenseID);
  };

  const editExpense = (expense) => {
    setShowForm("expenseForm");
    setExpenseToEdit(expense);
  };

  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };
  
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
  );
};

const createExpense = () => {
  if (expenseToEdit) {
    setExpenseToEdit(null);
  }
  setShowForm("expenseForm");
};


const handleSelectedExpenseDelete= ()=> {
  deleteSelectedExpenseMutation(selectRows, {
    onSuccess: ()=> {
      refetch()
    }
  })
}

const filteredExpenses = searchHook(expenses, searchInput, selectedFilter);
const allIds = (filteredExpenses && filteredExpenses.map((item) => item.id)) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ProgressLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pt-10 md:pt-16 md:pl-28 mx-auto md:px-10 px-2  max-w-[100vw]">
      <div className="flex justify-between">
        <div className="flex flex-col text-sm md:mx-0 mx-2">
          <h1 className="text-2xl md:text-3xl font-bold w-full">Expenses</h1>
          <p className="text-gray-500">showing expenses {filteredExpenses?.length} of {expenses?.length}</p>
        </div>
        <AddButton onClick={createExpense} />
      </div>
      {showForm === "expenseForm" && (
        <ExpenseFormModal
          setShowForm={setShowForm}
          expenseToEdit={expenseToEdit}
          setExpenseToEdit={setExpenseToEdit}
        />
      )}
      <div className=" rounded-xl shadow border bg-white">
        <div className="flex justify-between items-center mx-4 py-4">
          <div>
            <span className="absolute text-xl text-gray-400 mt-2 ml-1">
              <MdSearch />
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e)=> setSearchInput(e.target.value)}
              placeholder="search expenses"
              className="border pl-7 outline-gray-300 p-1 rounded-md"
            />
          </div>
          <div>
            <select
              name="filter"
              value={selectedFilter}
              onChange={(e)=> setSelectedFilter(e.target.value)}
              className="border border-gray-400 p-1 rounded-md outline-gray-500"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className=" text-sm text-left w-full border-separate border-spacing-0">
          <thead className="bg-blue-50 text-gray-600">
            <tr>
              {filteredExpenses.length > 0 && (
                <th className="px-6 py-4 border-y border-y-gray-100">
                  <input
                    type="checkbox"
                    checked={selectRows.length === allIds.length}
                    onChange={handleSelectAll}
                    className="accent-blue-500"
                  />
                </th>
              )}
              <th className="px-6 py-4 border-y border-gray-100">Name</th>
              <th className="px-6 py-4 border-y border-gray-100">Category</th>
              <th className="px-6 py-4 border-y border-gray-100">Date</th>
              <th className="px-6 py-4 border-y border-gray-100">Amount</th>
              <th className="px-6 py-4 border-y border-gray-100">Action</th>
              {selectRows.length > 0 && (
                <th className={`absolute ${selectedDeleteIsPending ? "animate-pulse" : ""} right-16 mt-3`} onClick={handleSelectedExpenseDelete}>
                  <DeleteButton />
                </th>
              )}
            </tr>
          </thead>
          <tbody className="text-gray-800 divide-y divide-gray-100 ">
            {filteredExpenses?.length > 0 ? (
              filteredExpenses.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {filteredExpenses.length > 0 && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectRows.includes(item.id)}
                        onChange={() => handleRowSelect(item.id)}
                        className="accent-blue-500"
                      />
                    </td>
                  )}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div>
                      <p className="text-sm font-medium">{item.subject}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        item.category === "fuel" ? "bg-orange-100 text-orange-700" : item.category === "food" ?  "bg-green-200" : item.category === "clothing" ? "bg-purple-300"  : "bg-blue-300"
                      }  text-xs font-medium px-3 py-1 rounded-full capitalize`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="hidden md:block px-6 py-4 w-full font-semibold text-gray-800">
                    {item.date &&
                      new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                  </td>
                  <td className="md:hidden block px-6 py-4 w-full font-semibold text-gray-800">
                    {item.date &&
                      new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{item.amount}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button
                      onClick={() => editExpense(item)}
                      className="text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-md text-lg transition"
                    >
                      <TbEdit />
                    </button>
                    <button
                      onClick={() => deleteExpense(item.id)}
                      className={`text-red-600 hover:bg-red-100 px-3 py-1 rounded-md text-lg transition ${
                        isPending && item.id === deleteExpenseId
                          ? "animate-pulse"
                          : ""
                      }`}
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetails;
