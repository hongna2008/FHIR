var json = {
	name : "<profile name>",
	open:true,
	children : [{
		name : "resourceType"
	}, {
		name : "id"
	}, {
		name : "meta",
		children:[{
			name:"versionId"
		},{
			name:"lastUpdated"
		}]
	}, {
		name : "url",
		desc:"<uri>"
	}, {
		name : "name"
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
						name:"sliceName"
					},{
						name:"short"
					},{
						name:"definition"
					},{
						name:"comment"
					},{
						name:"alias",
						
						dataType:"increase",
						childrenClone:[{
							name:0
						}]
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
						name:"mustSupport"
					},{
						name:"isSummary"
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
						name:"sliceName"
					},{
						name:"short"
					},{
						name:"definition"
					},{
						name:"comment"
					},{
						name:"alias",
						
						dataType:"increase",
						childrenClone:[{
							name:0
						}]
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
						name:"mustSupport"
					},{
						name:"isSummary"
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