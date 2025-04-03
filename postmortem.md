Development Postmortem

**Overall Architecture**

The architecture of the application is structured into distinct layers
to ensure clear separation of concerns and better maintainability. The
Objects layer defines the core data structures like events, users, and
songs, serving as the foundation for the data exchanged between layers.
The UI layer manage user interactions with the screen and requests and
sends data to the Logic layer. The Logic layer enforces the business
rules, validates data and acts as an intermediary between the UI and
Database layers. Finally, the database layer ensures that the data is
persistent while the Application layer orchestrates dependencies and
provides a centralized service management.

**What Went Right**

- Overall, we were satisfied with the work we have accomplished. After
  iteration 2, we felt like we really improved in terms of group dynamic
  and communication. We started to carefully evaluate the feedback we
  received and learnt how to move forward.

- Our group discussions are meaningful, and our group managed to
  communicate frequently to stay updated with the project status.

- Despite having overlapping responsibilities, we gained good experience
  with working with each other and learnt how to maneuver around various
  challenges through consistent communication.

- We are confident that we successfully met the success criteria we
  outlined in the earlier retrospective.

**What Went Wrong**

- We wished we spent more time planning our architecture design at the
  start of the term so that we could have avoided some technical debt.

- We wished we paid more attention to the rubric so that we could have
  better spent our efforts in meeting the graded requirements.

**Lessons Learned**

- Signing up for the class, I didn\'t expect to implement any UI related
  code. Before this

<!-- -->

- class, I had never created a html or xml file. But I'm happy to say
  that I have gained

<!-- -->

- the ability to created anything I wanted to create a beautiful UI.

<!-- -->

- • Another unexpected thing was learning how to refactor code
  efficiently and

<!-- -->

- effectively. As mentioned in class, coding assignments for previous
  courses have

<!-- -->

- been relatively "messy" and unorganized. Of course, when we first
  started this

<!-- -->

- project, we did not have the proper organization for any of our code.
  Therefore, a lot

<!-- -->

- of refactoring was done to ensure we met the project requirements.
  Overtime, we all

<!-- -->

- learnt how to refactor code efficiently and effectively.

<!-- -->

- • Knowing how to properly collaborate with each other was a skill we
  learnt over time

<!-- -->

- as we worked on this project. We had to handle responsibility
  conflicts often. For

<!-- -->

- the times where conflicts were inevitable due to the nature of the
  work, we kept

<!-- -->

- consistent communication with each other to make sure that code and
  important

<!-- -->

- work does not go missing.

**Project Metrics**

- Total classes: 45

- Total methods: 249

Application: 13

Database: 37

Logic: 43

Object: 35

UI: 121

- Hours spent: 143h

Iteration 1: 2mo 1w 7h

Iteration 2: 1mo 2w 7h

Iteration 3: 1mo 1w 1h

**Outstanding Issues**

- We currently store the music data locally as large MP3 files. Due to
  file size constraints, only four songs have been included to prevent
  the program from becoming overly large. This introduces a form of
  technical debt, specifically in the area of file compression. While
  compressing MP3 files isn't critical for the program's functionality,
  it would be a valuable enhancement in the future to optimize storage.
  Another potential improvement could involve saving the songs in a
  cloud database and streaming them dynamically, rather than relying on
  the local database. However, since our current architecture is built
  around a local database, this suggestion remains outside our scope for
  now.
