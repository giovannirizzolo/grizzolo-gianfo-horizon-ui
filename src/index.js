import { ChakraProvider } from "@chakra-ui/react";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import "assets/css/App.css";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import RTLLayout from "layouts/rtl";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from "react-router-dom";
import theme from "theme/theme";

ReactDOM.render(
  <ChakraProvider theme={theme} >
    <React.StrictMode>
      <ThemeEditorProvider>
        <BrowserRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Route path={`/rtl`} component={RTLLayout} />
            <Redirect from='/' to='/admin' />
          </Switch>
        </BrowserRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
