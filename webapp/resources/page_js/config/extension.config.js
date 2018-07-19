var json = {
	name : "<extension name>",
	open:true,
	children : [{
		name : "resourceType"
	}, {
		name : "id"
	}, {
		name : "text",
		children:[{
			name:"status"
		},{
			name:"div"
		}]
	}, {
		name : "url"
	}, {
		name : "version"
	}, {
		name : "name"
	}, {
		name : "title"
	}, {
		name : "status"
	}, {
		name : "date"
	}, {
		name : "publisher"
	}, {
		name : "contact",
		dataType:"increase",
		childrenClone:[{
			name:0,
			children:[{
				name:"telecom",
				dataType:"increase",
				childrenClone:[{
					name:0,
					children:[{
						name:"system"
					},{
						name:"value"
					}]
				}]
			}]
		}]
	}, {
		name : "description"
	}, {
		name : "jurisdiction",
		dataType:"increase",
		childrenClone:[{
			name:0,
			children:[{
				name:"coding",
				dataType:"increase",
				childrenClone:[{
					name:0,
					children:[{
						name:"system"
					},{
						name:"code"
					},{
						name:"display"
					}]
				}]
			}]
		}]
	}, {
		name : "fhirVersion"
	}, {
		name : "mapping",
		dataType:"increase",
		childrenClone:[{
			name:0,
			children:[{
				name:"identity"
			},{
				name:"uri"
			},{
				name:"name"
			}]
		}]
	}, {
		name : "kind"
	}, {
		name : "abstract"
	}, {
		name : "contextType"
	}, {
		name : "context",
		dataType:"increase",
		childrenClone:[{
			name:0
		}]
	}, {
		name : "type"
	}, {
		name : "baseDefinition"
	}, {
		name : "derivation"
	}, {
		name : "snapshot",
		children:[{
			dataType:"increase",
			name:"element",
			childrenClone:[{
				name:0,
				children:[
					{
						name:"id",
					},{
						name:"path"
					},{
						name:"short"
					},{
						name:"definition"
					},{
						name:"comment"
					},{
						name:"min"
					},{
						name:"max"
					},{
						name:"base",
						children:[{
							name:"path"
						},{
							name:"min"
						},{
							name:"max"
						}]
					},{
						name:"condition",
						dataType:"increase",
						childrenClone:[{
							name:0
						}]
					},{
						name:"constraint",
						dataType:"increase",
						childrenClone:[{
							name:0,
							children:[{
								name:"key"
							},{
								name:"severity"
							},{
								name:"human"
							},{
								name:"expression"
							},{
								name:"xpath"
							},{
								name:"source"
							}]
						}]
					},{
						name:"isModifier"
					},{
						name:"Mapping",
						dataType:"increase",
						childrenClone:[{
							name:0,
							children:[{
								name:"identity"
							},{
								name:"map"
							}]
						}]
					}
				]
			}]
		}]
	}, {
		name : "differential",
		children:[{
			dataType:"increase",
			name:"element",
			childrenClone:[{
				name:0,
				children:[
					{
						name:"id",
					},{
						name:"path"
					},{
						name:"short"
					},{
						name:"definition"
					},{
						name:"comment"
					},{
						name:"min"
					},{
						name:"max"
					},{
						name:"base",
						children:[{
							name:"path"
						},{
							name:"min"
						},{
							name:"max"
						}]
					},{
						name:"condition",
						dataType:"increase",
						childrenClone:[{
							name:0
						}]
					},{
						name:"constraint",
						dataType:"increase",
						childrenClone:[{
							name:0,
							children:[{
								name:"key"
							},{
								name:"severity"
							},{
								name:"human"
							},{
								name:"expression"
							},{
								name:"xpath"
							},{
								name:"source"
							}]
						}]
					},{
						name:"isModifier"
					},{
						name:"Mapping",
						dataType:"increase",
						childrenClone:[{
							name:0,
							children:[{
								name:"identity"
							},{
								name:"map"
							}]
						}]
					}
				]
			}]
		}]
	} ]
};