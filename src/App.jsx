import { useState, useEffect } from 'react'
// import './App.css'
import { getUser, createUser } from './app/userApi.js';
import Admin from '../components/admin/admin.jsx';
import Header from '../components/header.jsx';
import Signin from '../pages/signin.jsx';
import Login from "../pages/login.jsx";
import Slide from '../pages/slider.jsx';
import AppLayOut from "./AppLayOut.jsx";
import NapTheTuDong from "../pages/napthetudong.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThongTinTaiKhoan from '../pages/thongtintaikhoan.jsx';
import LichSuGiaoDich from '../pages/lichsugiaodich.jsx';
import DichVuDaMua from '../pages/dichvudamua.jsx';
import TheCaoDaMua from '../pages/thecaodamua.jsx';
import LichSuNapThe from '../pages/lichsunapthe.jsx';
import TaiKhoanDaMua from '../pages/taikhoandamua.jsx';
import NapTienATM from '../pages/naptienATM.jsx';
import LichSuQuayMiniGame from '../pages/lichsuquayminigame.jsx';
import LichSuTrungNick from '../pages/lichsutrungnick.jsx';
import RutNgocNro from '../pages/rutngocnro.jsx';
import RutVangNro from '../pages/rutvangnro.jsx';
import RutQuanHuyLienQuan from '../pages/rutquanhuylienquan.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={
          <>
            <Admin />
          </>
        }
        />
        <Route
          path="/" element={
            <>
              <Header />
              <Slide />
            </>
          } />


        <Route path="/login" element={
          <>
            <Header />
            <Login />
          </>
        } />


        <Route path="/signin" element={
          <>
            <Header />
            <Signin />
          </>
        } />


        <Route element={<AppLayOut />}>
          <Route path="thong-tin-tai-khoan" element={<ThongTinTaiKhoan />} />
          <Route path="lich-su-giao-dich" element={<LichSuGiaoDich />} />
          <Route path="dich-vu-da-mua" element={<DichVuDaMua />} />
          <Route path="the-cao-da-mua" element={<TheCaoDaMua />} />
          <Route path="nap-the-tu-dong" element={<NapTheTuDong />} />
          <Route path="lich-su-nap-the" element={<LichSuNapThe />} />
          <Route path="tai-khoan-da-mua" element={<TaiKhoanDaMua />} />
          <Route path="nap-tien-ATM" element={<NapTienATM />} />
          <Route path="lich-su-quay-minigame" element={<LichSuQuayMiniGame />} />
          <Route path="lich-su-trung-nick" element={<LichSuTrungNick />} />
          <Route path="rut-ngoc-nro" element={<RutNgocNro />} />
          <Route path="rut-vang-nro" element={<RutVangNro />} />
          <Route path="rut-quan-huy-lien-quan" element={<RutQuanHuyLienQuan />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
