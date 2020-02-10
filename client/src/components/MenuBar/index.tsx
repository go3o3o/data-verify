import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import {
  NavLink as RRNavLink,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

interface MenuFilterProps extends RouteComponentProps {
  subMenu: string;
}

class MenuBar extends Component<MenuFilterProps> {
  constructor(props: MenuFilterProps) {
    super(props);
    this.state = { open: false, active: this.props.subMenu };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ open: !this.state['open'] });
  }

  render() {
    return (
      <>
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state['open']} navbar>
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar size="md" setActiveFromChild>
                  <DropdownToggle
                    nav
                    caret
                    style={{ fontSize: 22, paddingRight: 20 }}
                  >
                    신규수집기
                  </DropdownToggle>
                  <DropdownMenu right={false}>
                    <DropdownItem
                      href="/node/nodeStatus"
                      active={
                        this.state['active'] === 'nodeStatus' ? true : false
                      }
                    >
                      현황
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      href="/node/nodeMonitoring"
                      active={
                        this.state['active'] === 'nodeMonitoring' ? true : false
                      }
                    >
                      모니터링
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar setActiveFromChild>
                  <DropdownToggle
                    nav
                    caret
                    style={{ fontSize: 22, paddingRight: 20 }}
                  >
                    디맵수집기
                  </DropdownToggle>
                  <DropdownMenu right={false}>
                    <DropdownItem
                      href="/dmap/dmapStatus"
                      active={
                        this.state['active'] === 'dmapStatus' ? true : false
                      }
                    >
                      현황
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      href="/dmap/dmapMonitoring"
                      active={
                        this.state['active'] === 'dmapMonitoring' ? true : false
                      }
                    >
                      모니터링
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem>
                  <NavLink
                    style={{ fontSize: 22, paddingRight: 20 }}
                    activeClassName="active"
                    tag={RRNavLink}
                    to="/count"
                  >
                    수집건수
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ fontSize: 22, paddingRight: 20 }}
                    activeClassName="active"
                    tag={RRNavLink}
                    to="/data/always"
                  >
                    상시수집
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ fontSize: 22, paddingRight: 20 }}
                    activeClassName="active"
                    tag={RRNavLink}
                    to="/data/retroactive"
                  >
                    소급수집
                  </NavLink>
                </NavItem>
              </Nav>
              <NavbarText>Data Verify for U</NavbarText>
            </Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}

export default withRouter(MenuBar);
