interface HeaderProps {
  scrolled: boolean
}

export const Header = ({ scrolled }: HeaderProps) => {
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <a href="#" className="logo">
          Sangga
        </a>
        
        <nav>
          <ul className="nav-menu">
            <li><a href="#features">Features</a></li>
            <li><a href="#specs">Specifications</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </nav>
        
        <a href="#order" className="cta-button">
          Order Now
        </a>
      </div>
    </header>
  )
}
