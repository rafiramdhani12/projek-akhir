import React from "react";
import Tabel from "../components/Tabel";

const DaftarMurid = ({ onFetch, onRefresh }) => {
  return <Tabel onFetch={onFetch} onRefresh={onRefresh} />;
};

export default DaftarMurid;
