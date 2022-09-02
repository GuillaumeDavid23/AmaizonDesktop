import {
	List,
	ListItem,
	ListItemText,
	Typography
} from '@mui/material'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AnimatedPage, Title } from '../globalComponents'

const Helps = () => {
	return (
		<AnimatedPage>
			<Container className="h-100">
				<Title text="Aidez-moi !" variant="h4" />
				<Row className="h-100">
					<Col>
						<Typography variant="h5">
							{' '}
							Raccourcis clavier :{' '}
						</Typography>
						<List>
							<ListItem>
								<ListItemText
									primary="Ajouter un client (Sur la liste)"
									secondary="CTRL + N"
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Copier"
									secondary="CTRL + C"
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Couper"
									secondary="CTRL + X"
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Coller"
									secondary="CTRL + V"
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Selectionner tout (dans un champs texte)"
									secondary="CTRL + A"
								/>
							</ListItem>
						</List>
					</Col>
					<Col>
						<Typography variant="h5">
							{' '}
							Raccourcis Souris (Menu contextuel) :{' '}
						</Typography>
						<List>
							<ListItem>
								<ListItemText
									primary="Copier"
									secondary="Selectionner un texte"
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Couper"
									secondary="Selectionner un texte dans un champs"
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Coller"
									secondary="Sur un champs texte"
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Rechercher sur Google"
									secondary="Selectionner un texte"
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Enregistrer l'image "
									secondary="Sur une image"
								/>
							</ListItem>
						</List>
					</Col>
				</Row>
			</Container>
		</AnimatedPage>
	)
}

export default Helps
