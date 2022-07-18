import "./booksList.css";
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
  border: 4px solid #f33b3b;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1.4rem;
  &:focus {
    outline: none;
    border: 4px solid #f33b3b;
  }
`;
const Container1 = styled.div`
  background-color: #e7ecf7;
  color: #2a7ade;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
`;
const Container2 = styled.div`
  background-color: #e5faf2;
  color: #3bb077;
  border-radius: 10px;
  padding: 10px;

  width: 100%;
`;
const Container3 = styled.div`
  background-color: #fff0f1;
  color: #d95087;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
`;
const Container1Text = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
`;
export default function BooksList() {
  const { books, search, setSearchQuery } = useContext(BooksContext);

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
      renderCell: (params) => {
        return <div className="userListUser">{params.row.buyer}</div>;
      },
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
      field: "durum",
      headerName: "Durum",
      width: 160,
      renderCell: (params) => {
        if (params.row.durum === 0) {
          return (
            <Container1>
              <Container1Text>Sipariş Alındı</Container1Text>
            </Container1>
          );
        } else if (params.row.durum === 1) {
          return (
            <Container2>
              <Container1Text>Sipariş Tamamlandı</Container1Text>
            </Container2>
          );
        } else
          return (
            <Container3>
              <Container1Text>Sipariş İptal Edildi</Container1Text>
            </Container3>
          );
      },
    },
    // {
    //   field: "createdAt",
    //   headerName: "Tarih",
    //   width: 240,
    //   valueFormatter: (params) => {
    //     if (params.row.createdAt.value === null) {
    //       return "";
    //     } else {
    //       const fireBaseTime = new Date(
    //         params.row.createdAt.seconds * 1000 + params.nanoseconds / 1000000
    //       );
    //       const date = fireBaseTime.toDateString().toString();
    //       return date;
    //     }
    //   },
    // },
  ];
  // const unFormattedDate = books.map((item) => item.createdAt);
  // console.log(unFormattedDate);
  // const formattedDate = unFormattedDate.map((item) =>
  //   new Date(item.seconds * 1000).toLocaleDateString("en-UK")
  // );

  // console.log(formattedDate);

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
        rows={search(books)}
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
