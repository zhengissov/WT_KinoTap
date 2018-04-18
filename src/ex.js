const {
  Button,
  Container,
  Divider,
  Dropdown,
  Header,
  Message,
  Segment,
} = semanticUIReact

const options = [
  { value: 'all', text: 'All' },
  { value: 'articles', text: 'Articles' },
  { value: 'products', text: 'Products' },
]

const App = () => (
  <Container>
    <Divider hidden />
    <Header as='h1'>Semantic-UI-React</Header>
    <Dropdown 
      placeholder='Select...' 
      selection
      search
      options={options}
      />
  </Container>
)

// ----------------------------------------
// Render to DOM
// ----------------------------------------
const mountNode = document.createElement('div')
document.body.appendChild(mountNode)

ReactDOM.render(<App />, mountNode)