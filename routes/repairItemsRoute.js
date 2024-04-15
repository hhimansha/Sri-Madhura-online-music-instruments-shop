import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateRequest from './pages/CreateRequest'
import ShowRequest from './pages/ShowRequest'
import EditRequest from './pages/EditRequest'
import DeleteRequest from './pages/DeleteRequest'


const App = () =>{
  return(
    <Routes>
      <Route path = '' element={<Home />} />
      <Route path = '/repair/create' element={<CreateRequest />} />
      <Route path = '/repair/details/:id' element={<ShowRequest />} />
      <Route path = '/repair/edit/:id' element={<EditRequest />} />
      <Route path = '/repair/delete/:id' element={<DeleteRequest />} />
    </Routes>
  )
}

export default App