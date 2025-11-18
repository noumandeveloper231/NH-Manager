import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const Table = ({
  data = [],
  columns = [],
  itemsPerPageOptions = [10, 25, 50, 100],
  children,
}) => {
  // Filter & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  // Filtering
  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          val &&
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // reset page
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);
  const startItem = filteredData.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, filteredData.length);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      {/* Search */}
      <div className="flex justify-between items-center p-4">
        <div className="relative w-full max-w-xs">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
          />
        </div>
      </div>

      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="text-left text-white bg-[var(--primary-color)] border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-sm font-bold uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children
            ? children(currentItems)
            : currentItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-50/50 border-t border-gray-300 transition duration-150 ease-in-out"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-3 text-gray-700">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length} className="px-6 py-3">
              {/* Pagination */}
              {filteredData.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {itemsPerPageOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-600">
                      {startItem} - {endItem} of {filteredData.length} items
                    </span>
                  </div>

                  {/* Page navigation */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 cursor-pointer py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <span
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 cursor-pointer py-1 text-sm border rounded-md ${
                            currentPage === page
                              ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </span>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 cursor-pointer py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
