import { BrowserRouter, Route, Routes } from "react-router";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Collaborators from "./views/Collaborators";
import CreateCollaborator from "./views/CreateCollaborator";
import Home from "./views/Home";
import Login from "./views/Login";
import UpdateCollaborator from "./views/UpdateCollaboratorAdmin";
import UpdateMyInformation from "./views/UpdateMyInformation";

// const Router = () => (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/collaborators" element={<Collaborators />} />
//         <Route path="/create-collaborator" element={<CreateCollaborator />} />
//         <Route path="/update-collaborator" element={<UpdateCollaborator />} />
//         <Route path="/profile" element={<UpdateMyInformation />} />
//       </Routes>
//     </BrowserRouter>
//   );

const Router = () => (
  <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      <Route
        path="/collaborators"
        element={
          <ProtectedRoute>
            <Collaborators />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-collaborator"
        element={
          <AdminRoute>
            <CreateCollaborator />
          </AdminRoute>
        }
      />

      <Route
        path="/update-collaborator"
        element={
          <AdminRoute>
            <UpdateCollaborator />
          </AdminRoute>
        }
      />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UpdateMyInformation />
            </ProtectedRoute>
          }
        />
      </Routes>
  </BrowserRouter>
);

export default Router;
