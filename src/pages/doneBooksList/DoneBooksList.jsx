import "./doneBooksList.css";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BooksContext } from "../../context/BooksContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import styled from "styled-components";
const Input = styled.input`
  width: 20%;
  padding: 2px 20px;
  margin: 8px 0;
  border: 4px dotted #f33b3b;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1.4rem;
  &:focus {
    outline: none;
    border: 4px solid #f33b3b;
  }
`;
export default function DoneBooksList() {
  const { doneBooks, search, setSearchQuery } = useContext(BooksContext);
  console.log(doneBooks);
  const handleDelete = async (id) => {
    try {
      const bookDoc = doc(db, "books", id);
      await deleteDoc(bookDoc);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "buyer",
      headerName: "Müşteri Adı",
      width: 200,
      // renderCell: (params) => {
      //   return <div className="userListUser">{params.row.buyer}</div>;
      // },
    },
    { field: "phone", headerName: "Telefon No", width: 180 },
    { field: "seller", headerName: "Satıcı", width: 150 },
    {
      field: "name",
      headerName: "Kitap Adı",
      width: 180,
    },
    {
      field: "insurance",
      headerName: "Kapora",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/siprais/${params.row.id}`}>
              <button className="userListEdit">Düzenle</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
    {
      field: "createdAt",
      type: "date",
      headerName: "Tarih",
      width: 240,

      valueFormatter: (params) => {
        if (params.value === null) {
          return "";
        } else {
          const fireBaseTime = new Date(
            params.seconds * 1000 + params.nanoseconds / 1000000
          );
          const date = fireBaseTime.toDateString();
          return date;
        }
      },
    },
  ];

  const localizedTextsMap = {
    columnMenuUnsort: "Sıralamayı Sıfırla",
    columnMenuSortAsc: "Alfabetic Sırala",
    columnMenuSortDesc: "Z den Başla",
    columnMenuFilter: "Filterlemek",
    columnMenuHideColumn: "Satır Gizle",
    columnMenuShowColumns: "Satırları Göster",
    toolbarDensity: "Görönüm",
    toolbarDensityLabel: "Görönüm",
    toolbarDensityCompact: "Dar",
    toolbarDensityStandard: "Standart",
    toolbarDensityComfortable: "Geniş",
    // Filters toolbar button text
    toolbarFilters: "Filterlemek",
    toolbarFiltersLabel: "Filterleri göster",
    toolbarFiltersTooltipHide: "Filterleri gizle",
    toolbarFiltersTooltipShow: "Filterleri göster",
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} Aktif Filter` : `${count} Aktif Filter`,
    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: "Ara...",
    toolbarQuickFilterLabel: "Ara",
    toolbarQuickFilterDeleteIconLabel: "Temizle",
    // Export selector toolbar button text
    toolbarExport: "Export",
    toolbarExportLabel: "Export",
    toolbarExportCSV: "CSV Olarak İndir",
    toolbarExportPrint: "Yazdır",
    // Columns panel text
    columnsPanelTextFieldLabel: "Kolon Bul",
    columnsPanelTextFieldPlaceholder: "Kolon Başlığı",
    columnsPanelDragIconLabel: "Kolonları Sırala",
    columnsPanelShowAllButton: "Hepsini göster",
    columnsPanelHideAllButton: "Hepsini gizle",

    // Filter operators text
    filterOperatorContains: "İçerir",
    filterOperatorEquals: "Eşittir",
    filterOperatorStartsWith: "İle Başlayan",
    filterOperatorEndsWith: "İle Biten",
    filterOperatorIsEmpty: "Boş Olan",
    filterOperatorIsNotEmpty: "Boş Olmayan",
    filterOperatorIsAnyOf: "Her Hangi",
    // Filter values text
    filterValueAny: "her hangi",
    filterValueTrue: "doğru",
    filterValueFalse: "yanlış",

    // Column menu text
    columnMenuLabel: "Menü",
    columnMenuShowColumns: "Kolonları göster",
    columnMenuFilter: "Filterlemek",
    columnMenuHideColumn: "Gizle",
    columnMenuUnsort: "Sırlamayı temizle",
    columnMenuSortAsc: "ASC ye göre sırala",
    columnMenuSortDesc: "DESC ye göre sırala",
    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} Aktif Filter` : `${count} Aktif Filter`,
    columnHeaderFiltersLabel: "Filterleri göster",
    columnHeaderSortIconLabel: "Sırala",

    // Rows selected footer text
    footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} seçilen satırlar`
        : `${count.toLocaleString()} seçilen satırlar`,

    // Total row amount footer text
    footerTotalRows: "Toplam Satır:",
    // Checkbox selection text
    checkboxSelectionHeaderName: "Checkbox selection",
    checkboxSelectionSelectAllRows: "Select all rows",
    checkboxSelectionUnselectAllRows: "Unselect all rows",
    checkboxSelectionSelectRow: "Select row",
    checkboxSelectionUnselectRow: "Unselect row",
  };

  return (
    <div className="userList">
      <Input
        type="text"
        placeholder="Sipariş Ara"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <DataGrid
        rows={search(doneBooks)}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        localeText={localizedTextsMap}
      />
    </div>
  );
}