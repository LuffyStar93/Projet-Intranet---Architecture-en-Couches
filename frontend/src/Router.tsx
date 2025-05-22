import { BrowserRouter, Route, Routes } from "react-router";
import Collaborators from "./views/Collaborators";
import CreateCollaborator from "./views/CreateCollaborator";
import Home from "./views/Home";
import Login from "./views/Login";
import UpdateCollaborator from "./views/UpdateCollaboratorAdmin";
import UpdateMyInformation from "./views/UpdateMyInformation";


const Router = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collaborators" element={<Collaborators />} />
        <Route path="/create-collaborator" element={<CreateCollaborator />} />
        <Route path="/update-collaborator" element={<UpdateCollaborator />} />
        <Route path="/profile" element={<UpdateMyInformation />} />
      </Routes>
    </BrowserRouter>
  );

export default Router;