const reactRouterDom = {
    useNavigate: () => jest.fn(),
    useParams: () => ({ taskId: '123' }),
    BrowserRouter: ({ children }) => children,
    Routes: ({ children }) => children,
    Route: ({ element }) => element,
    Link: ({ children }) => children,
    MemoryRouter: ({ children }) => children
};

module.exports = reactRouterDom;