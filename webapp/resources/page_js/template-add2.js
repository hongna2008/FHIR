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
		children[{
			name:"telecom",
			children:[{
				name:"system"
			},{
				name:"value"
			}]
		}]
	}, {
		name : "description"
	}, {
		name : "jurisdiction",
		children:[{
			name:"system"
		},{
			name:"code"
		},{
			name:"display"
		}]
	}, {
		name : "fhirVersion"
	}, {
		name : "mapping",
		children:[{
			name:"identity"
		},{
			name:"uri"
		},{
			name:"name"
		}]
	}, {
		name : "kind"
	}, {
		name : "abstract"
	}, {
		name : "contextType"
	}, {
		name : "context",
	}, {
		name : "type"
	}, {
		name : "baseDefinition"
	}, {
		name : "derivation"
	}, {
		name : "snapshot",
		children:[{
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
			name:"condition"
		},{
			name:"constraint",
			children[{
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
		},{
			name:"isModifier"
		},{
			name:"Mapping",
			children:[{
				name:"identity"
			},{
				name:"map"
			}]
		}]
	}, {
		name : "differential",
		children:[{
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
			name:"condition"
		},{
			name:"constraint",
			children[{
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
		},{
			name:"isModifier"
		},{
			name:"Mapping",
			children:[{
				name:"identity"
			},{
				name:"map"
			}]
		}]
	} ]
};