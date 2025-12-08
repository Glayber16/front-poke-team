# ⚡ Poke Teams Manager (Frontend)

Interface moderna desenvolvida com **Next.js 14 (App Router)** para gerenciamento de times Pokémon. O projeto utiliza renderização híbrida (Server & Client Components) para garantir performance e interatividade fluida.

🔗 **Backend Repository:** [Acesse aqui](https://github.com/Glayber16/Poke_Teams)  
🎥 **Demo de Funcionamento (Explicação pro professor):** [Assistir Vídeo](https://drive.google.com/file/d/1LzhdIVtUhiaV63K-WMMjM2_JJyny9OL9/view)

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Estado & Fetching:** React Hooks (`useState`, `useEffect`)
- **HTTP:** Fetch API nativa

## ✨ Funcionalidades

- **Listagem Otimizada:** Visualização de Pokémons em Grid Responsivo.
- **Filtros Dinâmicos:** Filtragem por Tipo Elemental (Fire, Water, etc.) com feedback visual instantâneo.
- **Busca:** Pesquisa de Pokémons por nome.
- **Gerenciamento de Times:**
  - Criação de times via formulário.
  - Adição de Pokémons aos times via Modal Interativo.
  - Visualização detalhada dos atributos (Stats) dos membros do time.
- **UX/UI:**
  - Atualização otimista da interface.
  - Design responsivo.
Embora o projeto atenda aos requisitos iniciais, as seguintes melhorias foram identificadas para evoluir a aplicação para um cenário de produção:
- [ ] **Persistencia de Dados** Adicionar persistencia com PostegreSQL
- [ ] **Testes:** Adicionar cobertura de testes unitários (Jest) no Backend.
- [ ] **Infraestrutura:** Criar setup com Docker Compose para facilitar o ambiente de desenvolvimento.
- [ ] **Performance:** Implementar paginação infinita (Infinite Scroll) na listagem de Pokémons no Frontend.


## 📂 Estrutura do Projeto

```bash
src/
├── app/           # Páginas e Rotas (File-system routing)
│   ├── page.tsx   # Home (Listagem e Filtros)
│   └── teams/     # CRUD de Times
├── components/    # Componentes Reutilizáveis (Cards, Modais, Nav)
└── types/         # Interfaces TypeScript (Contratos de dados)
