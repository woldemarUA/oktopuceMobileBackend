import express from 'express';
import db from '../../db/associations/associationsMobile.mjs';

export const optionsRouter = express.Router();

export const regroupItems = (options, name) => {
  const regroup = {};

  for (const item of options) {
    if (!regroup[item[name]]) {
      regroup[item[name]] = [];
      regroup[item[name]].push(item);
    } else {
      regroup[item[name]].push(item);
    }
  }

  return regroup;
};

optionsRouter.get('/product_parametrage', async (req, res) => {
  try {
    const productOptions = await db.EquipmentProduitModel.getProductOptions();
    const endroit_db = await db.EquipmentEndroitModel.getEndroitOptions();
    const endroitOptions = regroupItems(endroit_db, 'produit_id');
    const equipment_db = await db.EquipmentTypesModel.getEquipmentTypes();
    const equipmentOptions = regroupItems(equipment_db, 'endroit_id');
    res.status(200).json({
      msg: 'ok',
      options: { productOptions, endroitOptions, equipmentOptions },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// parent_equipment_id

optionsRouter.get('/parent', async (req, res) => {
  try {
    const options = await db.EquipmentsModel.getEquipmentOptions();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// site_id:

optionsRouter.get('/sites', async (req, res) => {
  try {
    const options = await db.SitesModel.getSitesOptions();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// produit_id:

optionsRouter.get('/products', async (req, res) => {
  try {
    const options = await db.EquipmentProduitModel.getProductOptions();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// endroit_id
optionsRouter.get('/endroits', async (req, res) => {
  try {
    const options = await db.EquipmentEndroitModel.getEndroitOptions();

    const regroup = {};

    for (const item of options) {
      if (!regroup[item.produit_id]) {
        regroup[item.produit_id] = [];
        regroup[item.produit_id].push(item);
      } else {
        regroup[item.produit_id].push(item);
      }
    }

    res.status(200).json({ msg: 'ok', options: regroup });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// equipment_type_id
optionsRouter.get('/equipments', async (req, res) => {
  try {
    const options = await db.EquipmentTypesModel.getEquipmentTypes();
    const regroup = {};
    for (const item of options) {
      if (!regroup[item.endroit_id]) {
        regroup[item.endroit_id] = [];
        regroup[item.endroit_id].push(item);
      } else {
        regroup[item.endroit_id].push(item);
      }
    }
    res.status(200).json({ msg: 'ok', options: regroup });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

//  location_id
optionsRouter.get('/locations', async (req, res) => {
  try {
    const options = await db.EquipmentLocationsModel.getLocations();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});
// nfc_tag_id
optionsRouter.get('/nfc', async (req, res) => {
  try {
    const options = await db.NfcTagsModel.getNfcs();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// gas_type_id
optionsRouter.get('/gas-types', async (req, res) => {
  try {
    const options = await db.EquipmentGasTypesModel.getGasTypes();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// equipment_brand_id

optionsRouter.get('/brands', async (req, res) => {
  try {
    const options = await db.EquipmentBrandsModel.getBrands();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// unite_exterieur_type_id:
optionsRouter.get('/ext-types', async (req, res) => {
  try {
    const options = await db.EquipmentExtTypesModel.getExtTypes();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// unite_interieur_type_id:
optionsRouter.get('/int-types', async (req, res) => {
  try {
    const options = await db.EquipmentIntTypesModel.getInteriorTypes();
    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});

// finalites

optionsRouter.get('/finalites', async (req, res) => {
  try {
    const options = await db.FinalitesModel.findAll({
      attributes: ['label', 'value'],
    });

    res.status(200).json({ msg: 'ok', options });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message });
  }
});
